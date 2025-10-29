import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewEncapsulation,
} from '@angular/core';
import { OrganizationsV2Service } from '../../administration/organizations/organizations-v2.service';
import { FirebaseAuthV2Service } from 'app/core/auth-firebase/firebase-auth-v2.service';
import { Organization, OrganizationModel } from '../../administration/organizations/organizations.model';

@Component({
    selector: 'invoice',
    templateUrl: './invoice.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [

    ],
})
export class InvoiceComponent {
    loginUser = inject(FirebaseAuthV2Service).loginUser();
    public _organizationsV2Service = inject(OrganizationsV2Service);
    public organization: Organization = OrganizationModel.emptyDto();
    
    /**
     * Constructor
     */
    constructor() {
        this._organizationsV2Service.getItem(this.loginUser.organization.id)
        this.organization = this._organizationsV2Service.organization();

    }
    
}
