import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { Transaction } from '../../models/transaction.model';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  account!: Account;
  transactions: Transaction[] = [];
  otherAccounts: Account[] = [];

  depositAmount: number = 0;
  transferAmount: number = 0;
  withdrawAmount: number = 0;
  selectedAccount!: string;

  loading: boolean = true;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAccountDetails();
    this.loadOtherAccounts();
  }

  // Load account details and transactions separately for better control
  loadAccountDetails() {
    const accountNumber = this.route.snapshot.paramMap.get('id');
    if (accountNumber) {
      this.accountService.getAccountByNumber(accountNumber).subscribe((account) => {
        this.account = account;
        this.loadTransactions(accountNumber); // Load transactions after fetching account
      });
    }
  }

  loadTransactions(accountNumber: string) {
    this.accountService.getTransactionsByAccountNumber(accountNumber).subscribe(
      (transactions) => {
        this.transactions = transactions.length
          ? transactions
          : [
              {
                id: 0,
                transactionType: 'No transactions found',
                oldBalance: this.account.balance,
                newBalance: this.account.balance,
                transactionAmount: 0, // No amount for no transactions
                timeStamp: new Date().toISOString(), // Use current date as string
              },
            ];
        this.loading = false; // Set loading to false after processing transactions
      },
      () => {
        this.transactions = [
          // Handle error gracefully
          {
            id: 0,
            transactionType: 'No transactions found',
            oldBalance: this.account.balance,
            newBalance: this.account.balance,
            transactionAmount: 0,
            timeStamp: new Date().toISOString(),
          },
        ];
        this.loading = false; // Set loading to false even on error
      }
    );
  }

  loadOtherAccounts() {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.otherAccounts = accounts.filter(
        (acc) => acc.accountNr !== this.account.accountNr
      );
    });
  }

  deposit() {
    this.accountService
      .deposit(this.account.accountNr, this.depositAmount)
      .subscribe(() => {
        this.account.balance += this.depositAmount; // Update balance directly
        this.loadAccountDetails();
        this.loadTransactions(this.account.accountNr); // Reload transactions only
        this.depositAmount = 0;

        alert('Deposit successful!'); // Immediate feedback
      });
  }

  withdraw() {
    this.accountService
      .withdraw(this.account.accountNr, this.withdrawAmount)
      .subscribe(() => {
        this.account.balance -= this.withdrawAmount; // Update balance directly
        this.loadAccountDetails();
        this.loadAccountDetails();

        this.loadTransactions(this.account.accountNr); // Reload transactions only
        this.withdrawAmount = 0;

        alert('Withdrawal successful!'); // Immediate feedback
      });
  }

  transfer() {
    if (this.transferAmount > this.account.balance) {
      alert('Transfer amount exceeds balance!');
      return;
    }

    if (this.transferAmount <= 0) {
      alert('Transfer amount should be positive!');
      return;
    }

    const transferDTO = {
      sourceAccountNumber: this.account.accountNr,
      targetAccountNumber: this.selectedAccount,
      transferAmount: this.transferAmount,
    };

    this.accountService.transfer(transferDTO).subscribe(() => {
      this.account.balance -= this.transferAmount; // Update balance directly
      this.loadAccountDetails();
      this.loadTransactions(this.account.accountNr); // Reload transactions only
      this.transferAmount = 0;
      this.selectedAccount = ''; // Reset selected account
      alert('Transfer completed successfully!');
    });
  }

  goBack() {
    this.router.navigate(['accounts']);
  }
}
