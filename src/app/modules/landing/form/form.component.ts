import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Add this import
import { FormsV2Service } from 'app/modules/axiomaim/jobjab/forms/forms-v2.service';
import { Model } from "survey-core";
import { SurveyModule } from "survey-angular-ui";
import { ThreeDimensionalLightPanelless } from "survey-core/themes";  // Simplified import (add others if needed)

const surveyJson = {
  elements: [
    {
      type: "address-lookup",
      name: "address",
      title: "Enter your address",
      placeholder: "Search for an address"
    }
  ]
};
@Component({
    selector: 'landing-form',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
      SurveyModule
    ],
})
export class LandingFormComponent implements OnInit, OnDestroy {
    public _formsV2Service = inject(FormsV2Service);
    private route = inject(ActivatedRoute);  // Inject ActivatedRoute
    surveyModel: Model;
    loadedForm: boolean = false;

    /**
     * Constructor
     */
    constructor() {}

    ngOnInit() {
        const resolvedForm = this.route.snapshot.data['form'];  // Use resolved data
        console.log('Resolved form data:', resolvedForm);
        if (resolvedForm && resolvedForm.formJson) {
            const survey = new Model(resolvedForm.formJson);
            // survey.applyTheme(ThreeDimensionalLightPanelless);                  
            survey.JSON = surveyJson;
            // survey.onComplete.add(this.surveyComplete);
            this.surveyModel = survey;
            this.loadedForm = true;
        } else {
            // Optional: Handle null (e.g., from resolver error). Resolver already navigates away, so this may not trigger.
            console.error('Failed to load form');
            this.loadedForm = false;
        }
    }

    ngOnDestroy(): void {}

    // surveyComplete (survey) {
    // const userId = /* ... Getting the user ID ... */
    // survey.setValue("userId", userId);

    // this.saveSurveyResults(,
    //   survey.data
    // )


  saveSurveyResults(url, json) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(json)
    })
    .then(response => {
      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    })
    .catch(error => {
      // Handle error
    });
  }

}