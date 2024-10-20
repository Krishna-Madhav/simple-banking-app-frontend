import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css'],
})

// This component is used to display notifications for transaction related activity.
export class NotificationModalComponent {
  @Input() message: string = ''; // Input property to receive the notification message
  @Input() isVisible: boolean = false; // Input property to control the visibility of the modal
  @Output() close = new EventEmitter<void>(); // Output event emitter to notify when the modal is closed

  // Method to emit the close event when the modal is closed
  onClose() {
    this.close.emit(); // Emit the close event to notify the parent component
  }
}
