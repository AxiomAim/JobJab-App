import { BooleanInput } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoginUserService } from 'app/core/login-user/login-user.service';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { UsersV2Service } from 'app/modules/davesa/administration/users/usersV2.service';
import { Subject, takeUntil } from 'rxjs';
import { ProjectCard } from '../../project-card.model';
import { DavesaCardComponent } from '@davesa/components/card';
import { UserButtonComponent } from 'app/layout/common/user-button/user-button.component';

@Component({
    selector: 'projects-card-item',
    templateUrl: './card-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    standalone: true,
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        UserButtonComponent,
        // NgIf,
        DavesaCardComponent

    ],
})
export class ProjectsCardItemComponent implements OnInit, OnDestroy {
    _usersV2Service = inject(UsersV2Service);
    @Input() card: ProjectCard;

    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */
    user: User;
    userDetails: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _loginUserService: LoginUserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}

