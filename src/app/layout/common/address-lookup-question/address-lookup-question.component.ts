import { Component } from "@angular/core";
import { QuestionAngular } from "survey-angular-ui";
import { AddressLookupComponent } from "../address-lookup/address-lookup.component";
import { QuestionAddressLookupModel } from "../question-address-loookup/question-address-loookup.model";
import { SvgRegistry, settings } from "survey-core";
import { getLocaleStrings } from "survey-creator-core";

const CUSTOM_TYPE = "address-lookup";
SvgRegistry.registerIcon(CUSTOM_TYPE, '<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>');  // Pin icon example
const locale = getLocaleStrings("en");
locale.qt[CUSTOM_TYPE] = "Address Lookup";
locale.pe.placeholder = "Address placeholder";

@Component({
  selector: `sv-ng-${CUSTOM_TYPE}`,
  templateUrl: "./address-lookup-question.component.html",
  styleUrls: ["./address-lookup-question.component.scss"],  // Optional for custom styles
  standalone: true,
  imports: [
    AddressLookupComponent
],  // Since your component is standalone
})
export class AddressLookupQuestionComponent extends QuestionAngular<QuestionAddressLookupModel> {
  // Handle selection from your component's output
  onAddressSelected(event: any): void {
    // Set survey value to formatted address (or full place object if preferred)
    this.model.value = event.value?.formatted_address || event.value;
  }

  // Optional: Handle value changes back to your component (CVA handles most)
  ngOnInit(): void {
    super.ngOnInit();
    // If needed, sync initial value
    if (this.model.value) {
      this.model.internalControl?.setValue(this.model.value);  // Assuming you expose internalControl if needed
    }
  }
}