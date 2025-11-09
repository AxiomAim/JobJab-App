import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsV2Service } from 'app/modules/axiomaim/jobjab/forms/forms-v2.service';
import { Model } from "survey-core";
import { SurveyModule } from "survey-angular-ui";
import { ThreeDimensionalLightPanelless, FlatDarkPanelless, SharpDarkPanelless, PlainLightPanelless, BorderlessDarkPanelless  } from "survey-core/themes";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'embed',
    styleUrls: ['./embed.component.scss'],
    templateUrl: './embed.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [SurveyModule],
})
export class EmbedComponent implements OnInit, OnDestroy {
    public _formsV2Service = inject(FormsV2Service);
    private route = inject(ActivatedRoute);  // Inject for query params
    public iframeSrc: string = '';  // Add this for dynamic src
    /**
     * Constructor
     */
    constructor() {}

    ngOnInit(): void {
            this.iframeSrc = 'https://jobjab.app/form/35961cb7-fac7-4e0a-ae9f-7b3b8facce1b';
    // const id = this.route.snapshot.queryParams['id'];
    //     if (id) {
    //         this.iframeSrc = `https://jobjab.app/form/${id}`;
    //         console.log('Embedding form with ID:', id);
    //     } else {
    //         // Fallback to hardcoded or error
    //         this.iframeSrc = 'https://jobjab.app/form/35961cb7-fac7-4e0a-ae9f-7b3b8facce1b';
    //         console.log('Embedding form without ID:');
    //     }

    }

    ngOnDestroy(): void {}
}
