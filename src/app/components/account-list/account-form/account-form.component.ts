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

// Component for creating a new account
export class AccountFormComponent {
  @Output() accountCreated = new EventEmitter<Account>(); // Event emitter for when an account is created
  @Output() formCancelled = new EventEmitter<void>(); // Event emitter for when the form is cancelled

  // Initialize a new account object with default values
  newAccount: Account = {
    accountNr: '',
    balance: 0,
    transactions: [],
  };

  // Method to create a new account

  createAccount() {
    if (this.newAccount.accountNr) {
      this.accountCreated.emit(this.newAccount); // Emit the new account data
      this.resetForm(); // Reset the form after account creation
    } else {
      alert("Please fill in required field: 'Account Number'"); // Alert if account number is missing
    }
  }

  // Method to reset the form fields to their default values
  resetForm() {
    this.newAccount = {
      accountNr: '',
      balance: 0,
      transactions: [],
    };
  }

  // Method to handle form cancellation
  cancel() {
    this.resetForm();
    this.formCancelled.emit(); // Emit cancel event
  }
}
