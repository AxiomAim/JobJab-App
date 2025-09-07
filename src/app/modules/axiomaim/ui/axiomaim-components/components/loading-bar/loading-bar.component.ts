import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
    MatSlideToggleChange,
    MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { AxiomaimHighlightComponent } from '@axiomaim/components/highlight';
import { AxiomaimLoadingService } from '@axiomaim/services/loading';
import { AxiomaimComponentsComponent } from 'app/modules/axiomaim/ui/axiomaim-components/axiomaim-components.component';
import { finalize } from 'rxjs';

@Component({
    selector: 'loading-bar',
    templateUrl: './loading-bar.component.html',
    imports: [
        MatIconModule,
        MatButtonModule,
        AxiomaimHighlightComponent,
        MatTabsModule,
        MatSlideToggleModule,
        MatSliderModule,
    ],
})
export class LoadingBarComponent {
    apiCallStatus: string = '-';
    mode: 'determinate' | 'indeterminate' = 'indeterminate';
    sliderValue: number = 0;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _axiomaimComponentsComponent: AxiomaimComponentsComponent,
        private _axiomaimLoadingService: AxiomaimLoadingService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the drawer
     */
    toggleDrawer(): void {
        // Toggle the drawer
        this._axiomaimComponentsComponent.matDrawer.toggle();
    }

    /**
     * Show the loading bar
     */
    showLoadingBar(): void {
        this._axiomaimLoadingService.show();
    }

    /**
     * Hide the loading bar
     */
    hideLoadingBar(): void {
        this._axiomaimLoadingService.hide();
    }

    /**
     * Set the auto mode
     *
     * @param change
     */
    setAutoMode(change: MatSlideToggleChange): void {
        this._axiomaimLoadingService.setAutoMode(change.checked);
    }

    /**
     * Make a fake API call
     */
    makeAPICall(): void {
        this.apiCallStatus = 'Waiting...';

        this._httpClient
            .get('https://jsonplaceholder.typicode.com/posts?_delay=2000')
            .pipe(
                finalize(() => {
                    this.apiCallStatus = 'Finished!';
                })
            )
            .subscribe((response) => {
                console.log(response);
            });
    }

    /**
     * Toggle the mode
     */
    toggleMode(): void {
        // Show the loading bar
        this._axiomaimLoadingService.show();

        // Set the mode
        this.mode =
            this.mode === 'indeterminate' ? 'determinate' : 'indeterminate';
        this._axiomaimLoadingService.setMode(this.mode);
    }

    /**
     * Set the progress
     */
    setProgress(): void {
        this._axiomaimLoadingService.setProgress(this.sliderValue);
    }
}
