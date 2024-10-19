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
  showCreateAccountForm: boolean = false; // Control visibility of the form

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  onAccountCreated(account: Account) {
    this.accountService.createAccount(account).subscribe(() => {
      alert(`Account ${account.accountNr} created successfully!`);
      this.loadAccounts(); // Reload the account list after creation
      this.showCreateAccountForm = false; // Hide form after creation
    });
  }

  confirmDelete(account: Account) {
    const confirmed = window.confirm(
      `Are you sure you want to delete the account: ${account.accountNr}?`
    );
    if (confirmed) {
      this.deleteAccount(account);
    }
  }

  deleteAccount(account: Account) {
    this.accountService.deleteAccount(account.accountNr).subscribe(() => {
      alert(`Account ${account.accountNr} deleted successfully!`);
      this.loadAccounts(); // Reload the account list after deletion
    });
  }

  viewAccountDetails(account: Account) {
    this.router.navigate(['/account-detail', account.accountNr]);
  }

  onFormCancelled() {
    this.showCreateAccountForm = false; // Hide the create account form
  }
}
