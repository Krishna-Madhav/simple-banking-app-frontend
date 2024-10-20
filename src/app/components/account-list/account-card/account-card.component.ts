import { Component, Input } from '@angular/core';
import { Account } from '../../../models/account.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css'],
  standalone: true,
  imports: [CurrencyPipe],
})

// Displays details of user account as cards on Acccount list page
export class AccountCardComponent {
  @Input() account!: Account; // This will be initialized by the parent component
  @Input() onView!: (account: Account) => void; // Input property for the function to view account details
  @Input() onDelete!: (account: Account) => void; // Input property for the function to delete the account

  // Method to view account details, calls the provided onView function with the current account
  viewAccountDetails() {
    this.onView(this.account);
  }
}
