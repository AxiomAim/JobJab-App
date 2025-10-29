import { TextFieldModule } from '@angular/cdk/text-field';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OrganizationsV2Service } from '../../organizations/organizations-v2.service';
import { AddressLookupComponent } from 'app/layout/common/address-lookup/address-lookup.component';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { Organization } from '../../organizations/organizations.model';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'settings-organization',
    templateUrl: './organization.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        TextFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        AddressLookupComponent
    ],
})
export class SettingsOrganizationComponent implements OnInit {
    @Input() btnIcon: string = 'mat_outline:add';
    @Input() btnTitle: string = 'Add';
    @Input() external: boolean = false;
    @Output() jobCreated: EventEmitter<Organization> = new EventEmitter<Organization>();
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    _organizationsV2Service = inject(OrganizationsV2Service);
    organizationForm: UntypedFormGroup;
    isLoading = signal<boolean>(false);

    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        // Create the form
        this.organizationForm = this._formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            domain: [''],
            address: [''],
            phone: [''],
            email: [''],
            contact: [''],
            logo: [''],
            facebook: [''],
            x: [''],
            linkedIn: [''],
            google: [''],
            instagram: [''],
        });
        await this._organizationsV2Service.getItem(this.loginUser.organization.id)

        await this.organizationForm.patchValue(this._organizationsV2Service.organization());
    }
}
