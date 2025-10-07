import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { AxiomaimLeadConfig } from './lead-dialog.types';
import { AxiomaimLeadDialogComponent } from './dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class AxiomaimLeadService {
    private _matDialog: MatDialog = inject(MatDialog);
    private _defaultConfig: AxiomaimLeadConfig = {
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
        config: AxiomaimLeadConfig = {}
    ): MatDialogRef<AxiomaimLeadDialogComponent> {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(AxiomaimLeadDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'axiomaim-lead-dialog-panel',
        });
    }
}
