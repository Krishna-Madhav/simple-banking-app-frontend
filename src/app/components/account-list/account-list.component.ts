import { Component, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  // Method to create a new account
  createAccount() {
    if (this.newAccount.accountNr) {
      this.accountService.createAccount(this.newAccount).subscribe(() => {
        alert('Account created successfully!');
        this.showCreateAccountForm = false;
        this.newAccount = {
          accountNr: '',
          balance: 0,
          transactions: [],
        }; // Reset the newAccount form
        this.loadAccounts(); // Reload the account list after creation
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Method to confirm deletion of an account
  confirmDelete(account: Account) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the account with number ${account.accountNr}?`
    );
    if (confirmed) {
      this.deleteAccount(account);
    }
  }

  // Method to delete an account
  deleteAccount(account: Account) {
    this.accountService.deleteAccount(account.accountNr).subscribe(() => {
      alert('Account deleted successfully!');
      this.loadAccounts(); // Reload the account list after deletion
    });
  }
}
