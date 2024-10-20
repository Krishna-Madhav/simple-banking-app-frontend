import { Component, Input } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import required modules for this component
})
// Component for displaying all the transactions related to a particular account in a tabular format
export class TransactionHistoryComponent {
  @Input() transactions: Transaction[] | undefined; // Input property for transaction data, can be undefined

  // Getter to return an array of transactions
  get safeTransactions(): Transaction[] {
    return this.transactions || [];
  }
}
