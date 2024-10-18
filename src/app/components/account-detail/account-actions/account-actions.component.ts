import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { TransferDto } from '../../../models/transfer.model';
import { Account } from '../../../models/account.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationModalComponent } from '../../reusable/notification-modal/notification-modal.component';

@Component({
  selector: 'app-account-actions',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationModalComponent],
  templateUrl: './account-actions.component.html',
  styleUrls: ['./account-actions.component.css'],
})
export class AccountActionsComponent {
  @Input() account!: Account;
  @Input() accounts: Account[] = [];
  @Output() accountUpdated = new EventEmitter<void>(); // Emit event to notify parent component

  depositAmount!: number;
  withdrawAmount!: number;
  transferDto: TransferDto = {
    sourceAccountNumber: '',
    targetAccountNumber: '',
    transferAmount: 0,
  };

  showModal: boolean = false;
  notificationMessage: string = '';
  notificationVisible: boolean = false;

  constructor(private accountService: AccountService) {}

  deposit() {
    if (this.depositAmount > 0) {
      this.accountService.deposit(this.account.accountNr, this.depositAmount).subscribe(
        (response) => {
          this.notificationMessage = response.message;
          this.notificationVisible = true; // Show notification modal
          this.account.balance += this.depositAmount;
          this.depositAmount = 0;
          this.accountUpdated.emit(); // Emit event to refresh account details
        },
        (error) => {
          this.notificationMessage = 'An error occurred while depositing.';
          this.notificationVisible = true; // Show notification modal
          console.error(error);
        }
      );
    } else {
      this.notificationMessage =
        'Transaction cancelled! Deposit amount should be positive value.';
      this.notificationVisible = true; // Show notification modal
    }
  }

  withdraw() {
    if (this.withdrawAmount <= 0) {
      this.notificationMessage =
        'Transaction cancelled! Withdrawal amount should be positive value.';
      this.notificationVisible = true; // Show notification modal
    } else if (this.withdrawAmount > this.account.balance) {
      this.notificationMessage =
        'Transaction cancelled! Your withdrawal amount exceeds the current balance.';
      this.notificationVisible = true; // Show notification modal
    } else {
      this.accountService.withdraw(this.account.accountNr, this.withdrawAmount).subscribe(
        (response) => {
          this.notificationMessage = response.message;
          this.notificationVisible = true; // Show notification modal
          this.account.balance -= this.withdrawAmount;
          this.withdrawAmount = 0;
          this.accountUpdated.emit(); // Emit event to refresh account details
        },
        (error) => {
          this.notificationMessage = 'An error occurred while withdrawing.';
          this.notificationVisible = true; // Show notification modal
          console.error(error);
        }
      );
    }
  }

  openTransferModal() {
    // Check if the transfer amount and target account are valid
    if (this.transferDto.transferAmount <= 0 && !this.transferDto.targetAccountNumber) {
      this.notificationMessage =
        'Please select a target account and enter a valid transfer amount.';
      this.notificationVisible = true; // Show notification modal
      return;
    } else if (this.transferDto.transferAmount <= 0) {
      this.notificationMessage = 'Transfer amount should be a positive value.';
      this.notificationVisible = true; // Show notification modal
      return;
    } else if (!this.transferDto.targetAccountNumber) {
      this.notificationMessage = 'Please select a target account.';
      this.notificationVisible = true; // Show notification modal
      return;
    } else if (this.transferDto.transferAmount > this.account.balance) {
      this.notificationMessage =
        'Transaction cancelled! Your transfer amount exceeds the current balance.';
      this.notificationVisible = true; // Show notification modal
      return;
    }

    this.showModal = true; // Show transfer confirmation modal
  }

  transfer() {
    // Set the source account number before making the transfer
    this.transferDto.sourceAccountNumber = this.account.accountNr;

    this.accountService.transfer(this.transferDto).subscribe(
      (response) => {
        this.notificationMessage = response.message;
        this.notificationVisible = true; // Show notification modal
        this.account.balance -= this.transferDto.transferAmount;
        this.transferDto.targetAccountNumber = '';
        this.transferDto.transferAmount = 0;
        this.accountUpdated.emit(); // Emit event to refresh account details
        this.showModal = false; // Close modal after transfer
      },
      (error) => {
        this.notificationMessage = 'An error occurred while transferring.';
        this.notificationVisible = true; // Show notification modal
        console.error(error);
      }
    );
  }

  closeModal() {
    this.showModal = false; // Close confirmation modal
  }

  closeNotification() {
    this.notificationVisible = false; // Close notification modal
  }
}
