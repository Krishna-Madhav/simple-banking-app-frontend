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
export class AccountCardComponent {
  @Input() account!: Account; // This will be initialized by the parent component
  @Input() onView!: (account: Account) => void; // Using non-null assertion
  @Input() onDelete!: (account: Account) => void; // Using non-null assertion

  viewAccountDetails() {
    this.onView(this.account);
  }
}
