import { Question } from "survey-core";
import { Serializer } from "survey-core";

const CUSTOM_TYPE = "address-lookup";

export class QuestionAddressLookupModel extends Question {
  getType(): string {
    return CUSTOM_TYPE;
  }

  // Expose placeholder as a property (bindable to your component's @Input)
  get placeholder(): string {
    return this.getPropertyValue("placeholder", "");
  }
  set placeholder(val: string) {
    this.setPropertyValue("placeholder", val);
  }

  // Add more properties if needed, e.g., country restriction
  get country(): string {
    return this.getPropertyValue("country", "US");
  }
  set country(val: string) {
    this.setPropertyValue("country", val);
  }
}

Serializer.addClass(
  CUSTOM_TYPE,
  [
    {
      name: "placeholder",
      default: "Enter address",
      category: "general",
      visibleIndex: 3,
    },
    {
      name: "country",
      default: "US",
      category: "advanced",
      visibleIndex: 4,
    },
  ],
  () => new QuestionAddressLookupModel(""),
  "question"
);