import { Component, EventEmitter, Output } from '@angular/core';
import { Account } from '../../../models/account.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AccountFormComponent {
  @Output() accountCreated = new EventEmitter<Account>();
  newAccount: Account = {
    accountNr: '',
    balance: 0,
    transactions: [],
  };

  createAccount() {
    if (this.newAccount.accountNr) {
      this.accountCreated.emit(this.newAccount);
      this.resetForm();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  resetForm() {
    this.newAccount = {
      accountNr: '',
      balance: 0,
      transactions: [],
    }; // Reset the form
  }
}
