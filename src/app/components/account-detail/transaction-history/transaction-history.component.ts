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
export class TransactionHistoryComponent {
  @Input() transactions: Transaction[] | undefined; // Allow undefined

  get safeTransactions(): Transaction[] {
    return this.transactions || [];
  }
}
