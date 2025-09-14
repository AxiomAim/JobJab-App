import {Component, inject} from "@angular/core";
import {AlertMessagesService} from "./alert-messages.service";
import {NgClass} from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    selector: 'alert-messages',
    templateUrl: './alert-messages.component.html',
    styleUrls: ['./alert-messages.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        MatIconModule,
        MatTooltipModule
    ]
})
export class AlertMessagesComponent {

  alertMessagesService = inject(AlertMessagesService);

  alertMessage = this.alertMessagesService.alertMessage;

  setColor(severity: string): string {
    switch (severity) {
      case 'success':
        return 'bg-green-200';
      case 'info':
        return 'bg-sky-200';
      case 'warn':
        return 'bg-amber-200';
      case 'error':
        return 'bg-red-200';
      default:
        return 'bg-primary-200';
    }
  }

  onClose() {
    this.alertMessagesService.clear();
  }
}
