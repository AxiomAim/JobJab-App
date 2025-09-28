import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
    DavesaNavigationItem,
    DavesaNavigationService,
    DavesaVerticalNavigationComponent,
} from '@davesa/components/navigation';
import { ProjectsComposeComponent } from 'app/modules/davesa/manager/projects/compose/compose.component';
import { labelColorDefs } from 'app/modules/davesa/manager/projects/projects.constants';
import {
    MailFilter,
    MailFolder,
    MailLabel,
} from 'app/modules/davesa/manager/projects/mailbox.types';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectsV2Service } from '../ProjectsV2.service';
import { Router } from '@angular/router';
import { User } from 'app/modules/davesa/administration/users/user.model';
import { Organization } from 'app/modules/davesa/administration/organizations/organizations.model';
import { ProjectList } from '../project-list.model';
import { Project, ProjectModel } from '../project.model';
import { ProjectsAddBoardComponent } from '../add-board/add-board.component';
import { ProjectCardsDataService } from '../project-cards-data.service';
import { ProjectsAddProjectComponent } from '../add-project/add-project.component';


@Component({
    selector: 'projects-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule, 
        MatIconModule, 
        DavesaVerticalNavigationComponent,
        ProjectsAddProjectComponent
    ],
})
export class ProjectsSidebarComponent implements OnInit, OnDestroy {
    _projectsV2Service = inject(ProjectsV2Service);
    _matDialog = inject(MatDialog);
    _router = inject(Router);

    projects: Project[];
    projectLists: ProjectList[];
    filters: MailFilter[];
    folders: MailFolder[];
    labels: MailLabel[];
    menuData: DavesaNavigationItem[] = [];
    private _projectsMenuData: DavesaNavigationItem[] = [];
    private _filtersMenuData: DavesaNavigationItem[] = [];
    private _foldersMenuData: DavesaNavigationItem[] = [];
    private _labelsMenuData: DavesaNavigationItem[] = [];
    private _otherMenuData: DavesaNavigationItem[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    selectedProject: Project;
    loginUser: User;
    organization: Organization;

    /**
     * Constructor
     */
    constructor(
        private _davesaNavigationService: DavesaNavigationService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginUser = this._projectsV2Service.loginUser();
        this.organization = this._projectsV2Service.organization();
        this.projects = this._projectsV2Service.projects();

        if(this.projects.length > 0) {
            this._generateProjectsMenus();
        }

        // Labels
        // this._projectsService.labels$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((labels: MailLabel[]) => {
        //         this.labels = labels;

        //         this._generateLabelsMenuLinks();
        //     });

        // Generate other menu links
        // this._generateOtherMenuLinks();
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

    /**
     * Open compose dialog
     */
    openComposeDialog(): void {
        // Open the dialog
        const dialogRef = this._matDialog.open(ProjectsComposeComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!');
        });
    }

    // refactor() {
    //     console.log('Refactor')
    //     this._projectCardsDataService.getAll().pipe(switchMap((res) => {
    //         const allCards = res
    //         allCards.forEach(card => {
    //             card.images = []
    //             // let img: Image = {
    //             //     imageName: card.imageName,
    //             //     imageType: card.imageType,
    //             //     imagePath: card.imagePath,
    //             //     imageUrl: card.imageUrl
    //             // }
    //             // card.images.push(img)
    //         });
    //         return this._projectCardsDataService.bulkUpdate(allCards).pipe(map((res) => {
    //             console.log('refactor done', res)
    //             return res
    //         }))
    //     })).subscribe();
    // }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Generate menus for projects
     *
     * @private
     */
    private _generateProjectsMenus(): void {
        // Reset the folders menu data
        this._projectsMenuData = [];

        // Iterate through the folders
        this.projects.forEach((project) => {
            // Generate menu item for the folder
            const menuItem: DavesaNavigationItem = {                
                id: project.id,
                title: project.title,
                type: 'basic',
                icon: project.icon,
                function: () => {
                    this.selectProject(project)
                },
                // link: '/manager/projects/template/' + project.id,
            };

            // If the count is available and is bigger than zero...
            // if (project.count && project.count > 0) {
            //     // Add the count as a badge
            //     menuItem['badge'] = {
            //         title: project.count + '',
            //     };
            // }

            // Push the menu item to the folders menu data
            this._projectsMenuData.push(menuItem);
        });

        // Update the menu data
        this._updateMenuData();
    }


    selectProject(project: Project): void {
        this.selectedProject = project;
        console.log('project', project);
        this._router.navigate(['/manager/projects/', project.boardId]);

        // if(project && project.boardId) {
        //     // this._router.navigate(['/manager/projects/settings']);
        //     this._router.navigate(['/manager/projects/', project.boardId]);
        // } else {
        //     this._matDialog.open(ProjectsAddBoardComponent, {
        //         data: project,
        //         });
        //         this._matDialog.afterAllClosed.subscribe((data: any) => {
        //         this._router.navigate(['/manager/projects/', project.boardId]);
        //     });
        // }     
    }
    
        
    /**
     * Generate menus for folders
     *
     * @private
     */
    private _generateFoldersMenuLinks(): void {
        // Reset the folders menu data
        this._foldersMenuData = [];

        // Iterate through the folders
        this.folders.forEach((folder) => {
            // Generate menu item for the folder
            const menuItem: DavesaNavigationItem = {
                id: folder.id,
                title: folder.title,
                type: 'basic',
                icon: folder.icon,
                link: '/manager/projects/' + folder.slug,
            };

            // If the count is available and is bigger than zero...
            if (folder.count && folder.count > 0) {
                // Add the count as a badge
                menuItem['badge'] = {
                    title: folder.count + '',
                };
            }

            // Push the menu item to the folders menu data
            this._foldersMenuData.push(menuItem);
        });

        // Update the menu data
        this._updateMenuData();
    }

    /**
     * Generate menus for filters
     *
     * @private
     */
    private _generateFiltersMenuLinks(): void {
        // Reset the filters menu
        this._filtersMenuData = [];

        // Iterate through the filters
        this.filters.forEach((filter) => {
            // Generate menu item for the filter
            this._filtersMenuData.push({
                id: filter.id,
                title: filter.title,
                type: 'basic',
                icon: filter.icon,
                link: '/manager/projects/filter/' + filter.slug,
            });
        });

        // Update the menu data
        this._updateMenuData();
    }

    /**
     * Generate menus for labels
     *
     * @private
     */
    private _generateLabelsMenuLinks(): void {
        // Reset the labels menu
        this._labelsMenuData = [];

        // Iterate through the labels
        this.labels.forEach((label) => {
            // Generate menu item for the label
            this._labelsMenuData.push({
                id: label.id,
                title: label.title,
                type: 'basic',
                icon: 'heroicons_outline:tag',
                classes: {
                    icon: labelColorDefs[label.color].text,
                },
                link: '/manager/projects/label/' + label.slug,
            });
        });

        // Update the menu data
        this._updateMenuData();
    }

    /**
     * Generate other menus
     *
     * @private
     */
    private _generateOtherMenuLinks(): void {
        // Settings menu
        this._otherMenuData.push({
            title: 'Settings',
            type: 'basic',
            icon: 'heroicons_outline:cog-8-tooth',
            link: '/manager/projects/settings',
        });

        // Update the menu data
        this._updateMenuData();
    }

    /**
     * Update the menu data
     *
     * @private
     */
    private _updateMenuData(): void {
        this.menuData = [
            {
                title: 'AIMS',
                type: 'group',
                children: [...this._projectsMenuData],
            },
            // {
            //     title: 'BOARDS',
            //     type: 'group',
            //     children: [...this._projectListsMenuData],
            // },
            // {
            //     title: 'MAILBOXES',
            //     type: 'group',
            //     children: [...this._foldersMenuData],
            // },
            // {
            //     title: 'FILTERS',
            //     type: 'group',
            //     children: [...this._filtersMenuData],
            // },
            // {
            //     title: 'LABELS',
            //     type: 'group',
            //     children: [...this._labelsMenuData],
            // },
            {
                type: 'spacer',
            },
            ...this._otherMenuData,
        ];
    }

    /**
     * Update the navigation badge using the
     * unread count of the inbox folder
     *
     * @param folders
     * @private
     */
    private _updateNavigationBadge(folders: MailFolder[]): void {
        // Get the inbox folder
        const inboxFolder = this.folders.find(
            (folder) => folder.slug === 'inbox'
        );

        // Get the component -> navigation data -> item
        const mainNavigationComponent =
            this._davesaNavigationService.getComponent<DavesaVerticalNavigationComponent>(
                'mainNavigation'
            );

        // If the main navigation component exists...
        if (mainNavigationComponent) {
            const mainNavigation = mainNavigationComponent.navigation;
            const menuItem = this._davesaNavigationService.getItem(
                'manager.projects',
                mainNavigation
            );

            // Update the badge title of the item
            menuItem.badge.title = inboxFolder.count + '';

            // Refresh the navigation
            mainNavigationComponent.refresh();
        }
    }

        addProject(title: string): void {
            const newProject: Project = ProjectModel.emptyDto();
            newProject.orgId = this.organization.id;
            newProject.userId = this.loginUser.id;
            newProject.title = title;
            // Save the Manu
            this._projectsV2Service.createProject(newProject).subscribe(() => {
                this,this.ngOnInit();
            });
        }
    
}
