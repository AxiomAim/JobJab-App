import {Injectable, signal} from "@angular/core";
import {AlertMessage, AlertMessageSeverity} from "./alert-message.model";

@Injectable({
  providedIn: 'root'
})
export class AlertMessagesService {

  #alertMessageSignal = signal<AlertMessage | null>(null);

  alertMessage = this.#alertMessageSignal.asReadonly();

  showMessage(text:string, severity: AlertMessageSeverity) {
    this.#alertMessageSignal.set({
      text, severity
    })
  }

  clear() {
    this.#alertMessageSignal.set(null);
  }

}
