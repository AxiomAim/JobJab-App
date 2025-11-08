import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsV2Service } from 'app/modules/axiomaim/jobjab/forms/forms-v2.service';
import { Model } from "survey-core";
import { SurveyModule } from "survey-angular-ui";
import { ThreeDimensionalLightPanelless, FlatDarkPanelless, SharpDarkPanelless, PlainLightPanelless, BorderlessDarkPanelless  } from "survey-core/themes";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";

@Component({
    selector: 'landing-form',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [SurveyModule],
})
export class LandingFormComponent implements OnInit, OnDestroy {
    public _formsV2Service = inject(FormsV2Service);
    surveyModel: Model;
    /**
     * Constructor
     */
    constructor() {}

    ngOnInit(): void {
        const survey = new Model(this._formsV2Service.form().formJson);
        survey.applyTheme(ThreeDimensionalLightPanelless)
        this.surveyModel = survey;

    }

    ngOnDestroy(): void {}
}
