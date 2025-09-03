import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: false,
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent {
  @Input() title: string = 'An error occurred';
  @Input() message: string = 'Please try again later.';
}







