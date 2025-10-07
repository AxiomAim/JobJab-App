import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { AxiomaimCustomerConfig } from './customer-dialog.types';
import { AxiomaimCustomerDialogComponent } from './dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class AxiomaimCustomerService {
    private _matDialog: MatDialog = inject(MatDialog);
    private _defaultConfig: AxiomaimCustomerConfig = {
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
        config: AxiomaimCustomerConfig = {}
    ): MatDialogRef<AxiomaimCustomerDialogComponent> {
        // Merge the user config with the default config
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(AxiomaimCustomerDialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'axiomaim-customer-dialog-panel',
        });
    }
}
