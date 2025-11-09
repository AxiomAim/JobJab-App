import { Component, OnInit } from "@angular/core";
import { SurveyCreatorModel } from "survey-creator-core";
import "survey-core/survey.i18n";
import "survey-creator-core/survey-creator-core.i18n";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import { AceJsonEditorModel } from "survey-creator-core";
// import "survey-core/survey-core.css";
// import "survey-creator-core/survey-creator-core.css";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";

registerCreatorTheme(SurveyCreatorTheme); // Add predefined Survey Creator UI themes

AceJsonEditorModel.aceBasePath = "https://unpkg.com/ace-builds/src-min-noconflict/";

const creatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true
};

@Component({
    selector: 'form-creator-ace',
    styleUrls: ['./form-creator-ace.component.scss'],
    templateUrl: './form-creator-ace.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatTooltipModule,
    SurveyCreatorModule
],
})
export class FormCreatorAceComponent implements OnInit, OnDestroy {
    surveyCreatorModel: SurveyCreatorModel;
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    today = signal<string>(new Date().toISOString());
    /**
     * Constructor
     */
    constructor(
        private _router: Router
    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {

        const creator = new SurveyCreatorModel(creatorOptions);
        this.surveyCreatorModel = creator;
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

}
