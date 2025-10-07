import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AxiomaimConfirmationConfig as AxiomaimTouchConfig } from '@axiomaim/services/confirmation/confirmation.types';
import { AxiomaimTouchDialogComponent } from '@axiomaim/services/touch-dialog/dialog/dialog.component';
import { merge } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class AxiomaimTouchService {
    private _matDialog: MatDialog = inject(MatDialog);
    private _defaultConfig: AxiomaimTouchConfig = {
        title: 'Confirm action',
        message: 'Are you sure you want to confirm this action?',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation-triangle',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: 'Confirm',
                color: 'warn',
            },
            cancel: {
                show: true,
                label: 'Cancel',
            },
        },
        dismissible: false,
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    open(
        config: AxiomaimTouchConfig = {}
    ): MatDialogRef<AxiomaimTouchDialogComponent> {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(AxiomaimTouchDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'axiomaim-touch-dialog-panel',
        });
    }
}
