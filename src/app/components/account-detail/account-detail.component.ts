import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { TransferDto } from '../../models/transfer.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountInfoComponent } from './account-info/account-info.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AccountActionsComponent } from './account-actions/account-actions.component';

@Component({
  selector: 'app-account-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccountInfoComponent,
    TransactionHistoryComponent,
    AccountActionsComponent,
  ],
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  account!: Account;
  depositAmount!: number;
  withdrawAmount!: number;
  transferDto: TransferDto = {
    sourceAccountNumber: '',
    targetAccountNumber: '',
    transferAmount: 0,
  };
  accounts: Account[] = []; // To hold all accounts for transfers
  isLoadingAccountDetails: boolean = true; // To manage loading state for account details

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const accountNr = params['id'];
      this.loadAccountDetails(accountNr);
      this.loadAllAccounts(); // Load accounts for transfer on component initialization
    });
  }

  loadAccountDetails(accountNr: string) {
    this.accountService.getAccountByNumber(accountNr).subscribe(
      (account) => {
        this.account = { ...account, transactions: account.transactions || [] }; // Ensure transactions is an array
        this.isLoadingAccountDetails = false; // Set loading to false for account details
        this.loadTransactions(accountNr); // Load transactions once account details are available
      },
      (error) => {
        console.error('Error loading account details', error);
        this.isLoadingAccountDetails = false; // Set loading to false on error
      }
    );
  }

  loadTransactions(accountNr: string) {
    this.accountService.getTransactionsByAccountNumber(accountNr).subscribe(
      (transactions) => {
        this.account.transactions = transactions; // Update account transactions
      },
      (error) => {
        console.error('Error loading transactions', error);
      }
    );
  }

  loadAllAccounts() {
    this.accountService.getAccounts().subscribe(
      (accounts) => {
        this.accounts = accounts.filter(
          (account) => account.accountNr !== this.account.accountNr // Exclude the current account
        );
      },
      (error) => {
        console.error('Error loading accounts', error);
      }
    );
  }

  // This method refreshes account details, including transactions, after any action
  refreshAccountDetails() {
    this.loadAccountDetails(this.account.accountNr);
  }

  goToAccountList() {
    this.router.navigate(['/accounts']);
  }
}
