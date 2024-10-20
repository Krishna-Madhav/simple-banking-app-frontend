import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { TransferDto } from '../../../models/transfer.model';
import { Account } from '../../../models/account.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationModalComponent } from '../../reusable/notification-modal/notification-modal.component';
import { AppConstants } from '../../../constants/app.constants';

@Component({
  selector: 'app-account-actions',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationModalComponent],
  templateUrl: './account-actions.component.html',
  styleUrls: ['./account-actions.component.css'],
})

// Component for handling the transactions for an account
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

  // Method to handle deposit operation
  deposit() {
    if (this.depositAmount > 0) {
      this.accountService.deposit(this.account.accountNr, this.depositAmount).subscribe(
        (response) => {
          this.notificationMessage = response.message;
          this.notificationVisible = true;
          this.account.balance += this.depositAmount;
          this.depositAmount = 0;
          this.accountUpdated.emit();
        },
        (error) => {
          this.notificationMessage = AppConstants.MESSAGES.GENERAL_DEPOSIT_ERROR;
          this.notificationVisible = true;
          console.error(error);
        }
      );
    } else {
      this.notificationMessage = AppConstants.MESSAGES.INVALID_DEPOSIT_AMOUNT;
      this.notificationVisible = true;
    }
  }

  // Method to handle withdrawal operation
  withdraw() {
    if (this.withdrawAmount <= 0) {
      this.notificationMessage = AppConstants.MESSAGES.INVALID_WITHDRAWAL_AMOUNT;
      this.notificationVisible = true;
    } else if (this.withdrawAmount > this.account.balance) {
      this.notificationMessage = AppConstants.MESSAGES.EXCEEDS_BALANCE_WITHDRAWAL;
      this.notificationVisible = true;
    } else {
      this.accountService.withdraw(this.account.accountNr, this.withdrawAmount).subscribe(
        (response) => {
          this.notificationMessage = response.message;
          this.notificationVisible = true;
          this.account.balance -= this.withdrawAmount;
          this.withdrawAmount = 0;
          this.accountUpdated.emit(); // Emit event to refresh account details
        },
        (error) => {
          this.notificationMessage = AppConstants.MESSAGES.INVALID_WITHDRAWAL_AMOUNT;
          this.notificationVisible = true;
          console.error(error);
        }
      );
    }
  }

  // Method to open the transfer confirmation modal
  openTransferModal() {
    // Check if the transfer amount and target account are valid
    if (this.transferDto.transferAmount <= 0 && !this.transferDto.targetAccountNumber) {
      this.notificationMessage = AppConstants.MESSAGES.MISSING_ACCOUNT_AND_AMOUNT;
      this.notificationVisible = true;
      return;
    } else if (this.transferDto.transferAmount <= 0) {
      this.notificationMessage = AppConstants.MESSAGES.INVALID_TRANSFER_AMOUNT;
      this.notificationVisible = true;
      return;
    } else if (!this.transferDto.targetAccountNumber) {
      this.notificationMessage = AppConstants.MESSAGES.MISSING_TARGET_ACCOUNT;
      this.notificationVisible = true;
      return;
    } else if (this.transferDto.transferAmount > this.account.balance) {
      this.notificationMessage = AppConstants.MESSAGES.EXCEEDS_BALANCE_TRANSFER;
      this.notificationVisible = true;
      return;
    }

    this.showModal = true; // Show transfer confirmation modal
  }

  // Method to execute the transfer operation
  transfer() {
    // Set the source account number before making the transfer
    this.transferDto.sourceAccountNumber = this.account.accountNr;

    this.accountService.transfer(this.transferDto).subscribe(
      (response) => {
        this.notificationMessage = response.message;
        this.notificationVisible = true;
        this.account.balance -= this.transferDto.transferAmount;
        this.transferDto.targetAccountNumber = '';
        this.transferDto.transferAmount = 0;
        this.accountUpdated.emit(); // Emit event to refresh account details
        this.showModal = false; // Close modal after transfer
      },
      (error) => {
        this.notificationMessage = 'An error occurred while transferring.';
        this.notificationVisible = true;
        console.error(error);
      }
    );
  }

  // Method to close the confirmation modal
  closeModal() {
    this.showModal = false;
  }
  // Method to close the notification modal
  closeNotification() {
    this.notificationVisible = false;
  }
}
