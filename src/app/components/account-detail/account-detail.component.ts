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

/**
 * The AccountDetailComponent manages the display and actions related to a specific bank account.
 * It retrieves account details and transaction history based on the account number from the route parameters.
 * Additionally, it allows the user to perform account actions such as deposits, withdrawals, and transfers
 * and displays a list of other accounts for potential transfers. It also displays all the transaction for the account.
 */
export class AccountDetailComponent implements OnInit {
  account!: Account; // Holds the details of the current account
  depositAmount!: number;
  withdrawAmount!: number;
  transferDto: TransferDto = {
    // Data transfer object for transfers
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
    // Subscribe to route parameters to get the account number
    this.route.params.subscribe((params) => {
      // Extract account number from URL
      const accountNr = params['id'];
      this.loadAccountDetails(accountNr);
      this.loadAllAccounts(); // Load accounts for transfer on component initialization
    });
  }

  // Fetch account details using the account number

  loadAccountDetails(accountNr: string) {
    this.accountService.getAccountByNumber(accountNr).subscribe(
      (account) => {
        if (!account) {
          this.router.navigate(['/not-found']); // Redirect to 404 if account doesn't exist
          return;
        }
        this.account = { ...account, transactions: account.transactions || [] };
        this.isLoadingAccountDetails = false;
        this.loadTransactions(accountNr);
      },
      (error) => {
        console.error('Error loading account details', error);
        this.router.navigate(['/not-found']); // Redirect to 404 on error
        this.isLoadingAccountDetails = false;
      }
    );
  }

  // Fetch transactions associated with the account

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

  // Load all accounts to be available for transfer operations except the curent account
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

  // This method refreshes account details like transactions after any action is performed
  refreshAccountDetails() {
    this.loadAccountDetails(this.account.accountNr);
  }

  goToAccountList() {
    this.router.navigate(['/accounts']); // Navigate back to the accounts list
  }
}
