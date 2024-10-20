import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

/**
 * AppComponent is the root component of the banking application.
 * It serves as the main entry point for the app, handling routing through
 * Angular's RouterOutlet. The title property holds the application's name.
 */
export class AppComponent {
  title = 'banking-app';
}
