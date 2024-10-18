import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccountFormComponent } from './account-form/account-form.component';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [FormsModule, CommonModule, AccountCardComponent, AccountFormComponent],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  showCreateAccountForm: boolean = false;
  newAccount: Account = {
    accountNr: '',
    balance: 0,
    transactions: [], // Initialize transactions as empty
  };

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  createAccount(account: Account) {
    if (account.accountNr) {
      this.accountService.createAccount(account).subscribe(() => {
        alert('Account created successfully!');
        this.showCreateAccountForm = false;
        this.loadAccounts(); // Reload the account list after creation
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  confirmDelete(account: Account) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the account with number ${account.accountNr}?`
    );
    if (confirmed) {
      this.deleteAccount(account);
    }
  }

  deleteAccount(account: Account) {
    this.accountService.deleteAccount(account.accountNr).subscribe(() => {
      alert('Account deleted successfully!');
      this.loadAccounts(); // Reload the account list after deletion
    });
  }

  // New method to navigate to the account detail view
  viewAccountDetails(account: Account) {
    this.router.navigate(['/account-detail', account.accountNr]);
  }
}
