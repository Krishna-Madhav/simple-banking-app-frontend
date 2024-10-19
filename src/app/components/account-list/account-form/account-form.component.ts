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
  @Output() formCancelled = new EventEmitter<void>();
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
      alert("Please fill in required field: 'Account Number'");
    }
  }

  resetForm() {
    this.newAccount = {
      accountNr: '',
      balance: 0,
      transactions: [],
    };
  }

  cancel() {
    this.resetForm();
    this.formCancelled.emit(); // Emit cancel event
  }
}
