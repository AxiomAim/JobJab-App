import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { SurveyCreatorModel } from "survey-creator-core";
import "survey-core/survey.i18n";
import "survey-creator-core/survey-creator-core.i18n";
import { customThemeVariables } from "./theme_json";
import { getLocaleStrings } from "survey-creator-core";
import "survey-core/survey-core.css";
import "survey-creator-core/survey-creator-core.css";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";
import { SurveyCreatorModule } from 'survey-creator-angular';

registerCreatorTheme(SurveyCreatorTheme); // Add predefined Survey Creator UI themes

const surveyJson = {
  elements: [{
    name: "FirstName",
    title: "Enter your first name:",
    type: "text"
  }, {
    name: "LastName",
    title: "Enter your last name:",
    type: "text"
  }]
};

// Step 1: Define a theme object
const customTheme = {
    themeName: "customTheme",
    cssVariables: { ...customThemeVariables }
};
const enLocale = getLocaleStrings("en");

function addCustomTheme(theme, userFriendlyThemeName) {
    // Step 2: Specify a localized user-friendly theme name
    enLocale.creatortheme.names[theme.themeName] = userFriendlyThemeName;
    // Step 3: Register the custom theme
    registerCreatorTheme(theme);
}

addCustomTheme(customTheme, "Custom Theme");

@Component({
    // tslint:disable-next-line:component-selector
    selector: "theme-designer",
    templateUrl: "./theme-designer.component.html",
    styleUrls: ["./theme-designer.component.scss"],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        SurveyCreatorModule
    ]

})
export class ThemeDesignerComponent implements OnInit {
    model: SurveyCreatorModel;

    ngOnInit() {
        const creator = new SurveyCreatorModel({ showTranslationTab: true });
        creator.text = JSON.stringify(surveyJson);

        // Step 4: Apply the custom theme to Survey Creator
        creator.applyCreatorTheme(customTheme);
        
        creator.openCreatorThemeSettings();
        this.model = creator;
    }
}