import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import {
    AxiomaimNavigationItem,
    AxiomaimVerticalNavigationComponent,
} from '@axiomaim/components/navigation';
import { AxiomaimScrollResetDirective } from '@axiomaim/directives/scroll-reset';
import { AxiomaimMediaWatcherService } from '@axiomaim/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'axiomaim-components',
    templateUrl: './axiomaim-components.component.html',
    styleUrls: ['./axiomaim-components.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatSidenavModule,
        AxiomaimVerticalNavigationComponent,
        AxiomaimScrollResetDirective,
        RouterOutlet,
    ],
})
export class AxiomaimComponentsComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    drawerOpened: boolean;
    menuData: AxiomaimNavigationItem[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _axiomaimMediaWatcherService: AxiomaimMediaWatcherService) {
        this.menuData = [
            {
                id: 'axiomaim-components.libraries',
                title: 'Libraries',
                type: 'group',
                children: [
                    {
                        id: 'axiomaim-components.libraries.mock-api',
                        title: 'MockAPI',
                        type: 'basic',
                        link: '/ui/axiomaim-components/libraries/mock-api',
                    },
                ],
            },
            {
                id: 'axiomaim-components.components',
                title: 'Components',
                type: 'group',
                children: [
                    {
                        id: 'axiomaim-components.components.alert',
                        title: 'Alert',
                        type: 'basic',
                        link: '/ui/axiomaim-components/components/alert',
                    },
                    {
                        id: 'axiomaim-components.components.card',
                        title: 'Card',
                        type: 'basic',
                        link: '/ui/axiomaim-components/components/card',
                    },
                    {
                        id: 'axiomaim-components.components.drawer',
                        title: 'Drawer',
                        type: 'basic',
                        link: '/ui/axiomaim-components/components/drawer',
                    },
                    {
                        id: 'axiomaim-components.components.fullscreen',
                        title: 'Fullscreen',
                        type: 'basic',
                        link: '/ui/axiomaim-components/components/fullscreen',
                    },
                    {
                        id: 'axiomaim-components.components.highlight',
                        title: 'Highlight',
                        type: 'basic',
                        link: '/ui/axiomaim-components/components/highlight',
                    },
                    {
                        id: 'axiomaim-components.components.loading-bar',
                        title: 'Loading Bar',
                        type: 'basic',
                        link: '/ui/axiomaim-components/components/loading-bar',
                    },
                    {
                        id: 'axiomaim-components.components.masonry',
                        title: 'Masonry',
                        type: 'basic',
                        link: '/ui/axiomaim-components/components/masonry',
                    },
                    {
                        id: 'axiomaim-components.components.navigation',
                        title: 'Navigation',
                        type: 'basic',
                        link: '/ui/axiomaim-components/components/navigation',
                    },
                ],
            },
            {
                id: 'axiomaim-components.directives',
                title: 'Directives',
                type: 'group',
                children: [
                    {
                        id: 'axiomaim-components.directives.scrollbar',
                        title: 'Scrollbar',
                        type: 'basic',
                        link: '/ui/axiomaim-components/directives/scrollbar',
                    },
                    {
                        id: 'axiomaim-components.directives.scroll-reset',
                        title: 'ScrollReset',
                        type: 'basic',
                        link: '/ui/axiomaim-components/directives/scroll-reset',
                    },
                ],
            },
            {
                id: 'axiomaim-components.services',
                title: 'Services',
                type: 'group',
                children: [
                    {
                        id: 'axiomaim-components.services.config',
                        title: 'Config',
                        type: 'basic',
                        link: '/ui/axiomaim-components/services/config',
                    },
                    {
                        id: 'axiomaim-components.services.confirmation',
                        title: 'Confirmation',
                        type: 'basic',
                        link: '/ui/axiomaim-components/services/confirmation',
                    },
                    {
                        id: 'axiomaim-components.services.splash-screen',
                        title: 'SplashScreen',
                        type: 'basic',
                        link: '/ui/axiomaim-components/services/splash-screen',
                    },
                    {
                        id: 'axiomaim-components.services.media-watcher',
                        title: 'MediaWatcher',
                        type: 'basic',
                        link: '/ui/axiomaim-components/services/media-watcher',
                    },
                ],
            },
            {
                id: 'axiomaim-components.pipes',
                title: 'Pipes',
                type: 'group',
                children: [
                    {
                        id: 'axiomaim-components.pipes.find-by-key',
                        title: 'FindByKey',
                        type: 'basic',
                        link: '/ui/axiomaim-components/pipes/find-by-key',
                    },
                ],
            },
            {
                id: 'axiomaim-components.validators',
                title: 'Validators',
                type: 'group',
                children: [
                    {
                        id: 'axiomaim-components.validators.must-match',
                        title: 'MustMatch',
                        type: 'basic',
                        link: '/ui/axiomaim-components/validators/must-match',
                    },
                ],
            },
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to media query change
        this._axiomaimMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Set the drawerMode and drawerOpened
                if (matchingAliases.includes('md')) {
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
