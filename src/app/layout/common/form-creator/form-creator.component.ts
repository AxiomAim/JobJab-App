import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { MatTooltipModule } from '@angular/material/tooltip';
// survey-creator.component.ts
// import "survey-core/survey-core.min.css";
// import "survey-creator-core/survey-creator-core.min.css";
import { SurveyCreatorModel } from "survey-creator-core";
import { SurveyCreatorModule } from 'survey-creator-angular';
import "survey-core/survey-core.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const creatorOptions = {
  autoSaveEnabled: true,
  collapseOnDrag: true
};

@Component({
    selector: 'form-creator',
    styleUrls: ['./form-creator.component.scss'],
    templateUrl: './form-creator.component.html',
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
export class FormCreatorComponent implements OnInit, OnDestroy {
    @Input() formModel: string = 'form';
    surveyCreatorModel: SurveyCreatorModel;
    _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
    today = signal<string>(new Date().toISOString());
    isLoading = signal<boolean>(false);

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

        /**
     * Close Drawer (does not save form data) 
     */
    onSubmit(): void {

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
