import { Component, Input } from '@angular/core';
import { Account } from '../../../models/account.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-info',
  standalone: true,
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  imports: [CommonModule],
})
export class AccountInfoComponent {
  @Input() account!: Account; // Input property to receive account data
}