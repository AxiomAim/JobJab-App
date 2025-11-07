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
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AxiomaimMediaWatcherService } from '@axiomaim/services/media-watcher';
import { FormlyForm, FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { DemoSidebarComponent } from 'app/modules/axiomaim/ui/page-layouts/common/demo-sidebar/demo-sidebar.component';
import { Subject, takeUntil } from 'rxjs';
import { FormlySidebarComponent } from './formly-sidebar.component';

@Component({
    selector: 'formly-creator',
    styleUrls: ['./formly-creator.component.scss'],
    templateUrl: './formly-creator.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
    ReactiveFormsModule,
    MatSidenavModule,
    FormlySidebarComponent,
    MatButtonModule,
    MatIconModule,
],
})
export class FormlyCreatorComponent implements OnInit, OnDestroy {
  form = new UntypedFormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'Input',
      type: 'input',
      props: {
        label: 'Input',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      },
    },
  ];

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
 /**
     * Constructor
     */
    constructor(
      private _axiomaimMediaWatcherService: AxiomaimMediaWatcherService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to media changes
        this._axiomaimMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                } else {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

  }