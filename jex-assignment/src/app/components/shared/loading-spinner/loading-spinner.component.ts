import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div
      class="flex flex-col items-center justify-center p-8 space-y-4"
      role="status"
      [attr.aria-label]="message"
    >
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="text-gray-600 text-sm">{{ message }}</p>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() message = 'Loading...';
}