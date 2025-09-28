import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
    UrlMatchResult,
    UrlSegment,
} from '@angular/router';
import { ProjectsComponent } from 'app/modules/davesa/manager/projects/projects.component';
import { isEqual } from 'lodash-es';
import { catchError, finalize, forkJoin, throwError } from 'rxjs';
import { ProjectsV2Service } from './ProjectsV2.service';
import { ProjectsCardComponent } from './card/card.component';
import { ProjectsBoardComponent } from './board/board.component';
import { ProjectsPdfComponent } from './pdf/pdf.component';
import { UsersV2Service } from '../../administration/users/usersV2.service';
import { ProjectsCardDrawerComponent } from './board/card-drawer/drawer.component';


/**
 * Mailbox custom route matcher
 *
 * @param url
 */
const mailboxRouteMatcher: (url: UrlSegment[]) => UrlMatchResult = (
    url: UrlSegment[]
) => {
    // Prepare consumed url and positional parameters
    let consumed = url;
    const posParams = {};

    // Settings
    if (url[0].path === 'settings') {
        // Do not match
        return null;
    }
    // Filter or label
    else if (url[0].path === 'filter' || url[0].path === 'label') {
        posParams[url[0].path] = url[1];
        posParams['page'] = url[2];

        // Remove the id if exists
        if (url[3]) {
            consumed = url.slice(0, -1);
        }
    }
    // Folder
    else {
        posParams['folder'] = url[0];
        posParams['page'] = url[1];

        // Remove the id if exists
        if (url[2]) {
            consumed = url.slice(0, -1);
        }
    }

    return {
        consumed,
        posParams,
    };
};

// export default [
//     {
//         path: '',
//         redirectTo: 'inbox/1',
//         pathMatch: 'full',
//     },
//     {
//         path: 'filter/:filter',
//         redirectTo: 'filter/:filter/1',
//         pathMatch: 'full',
//     },
//     {
//         path: 'label/:label',
//         redirectTo: 'label/:label/1',
//         pathMatch: 'full',
//     },
//     {
//         path: ':folder',
//         redirectTo: ':folder/1',
//         pathMatch: 'full',
//     },
//     {
//         path: '',
//         component: ProjectsComponent,
//         resolve: {
//             loginUser: () => inject(ProjectsV2Service).initialize(), 
//             projects: projectsResolver,
//             filters: () => inject(ProjectsService).getFilters(),
//             folders: () => inject(ProjectsService).getFolders(),
//             labels: () => inject(ProjectsService).getLabels(),
//         },
//         children: [
//             {
//                 component: ProjectsListComponent,
//                 loginUser: () => inject(ProjectsV2Service).initialize(), 
//                 matcher: mailboxRouteMatcher,
//                 runGuardsAndResolvers: mailboxRunGuardsAndResolvers,
//                 resolve: {
//                     mails: mailsResolver,
//                 },
//                 children: [
//                     {
//                         path: '',
//                         pathMatch: 'full',
//                         component: ProjectsEmptyDetailsComponent,
//                     },
//                     {
//                         path: ':id',
//                         component: ProjectsDetailsComponent,
//                         resolve: {
//                             loginUser: () => inject(ProjectsV2Service).initialize(), 
//                             mail: mailResolver,
//                         },
//                     },
//                 ],
//             },
//             {
//                 path: 'settings',
//                 component: ProjectsSettingsComponent,
//             },
//             {
//                 path: 'template/:projectId',
//                 component: ProjectsTemplateComponent,
//                 resolve: {
//                     loginUser: () => inject(ProjectsV2Service).initialize(), 
//                     project: projectResolver,
//                     board: templateResolver
//                 },
//             },

//         ],
//     },
// ] as Routes;

/**
 * Card resolver
 *
 * @param route
 * @param state
 */
const projectsResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const _navMenuItemsV2Service = inject(ProjectsV2Service);
    const router = inject(Router);
    const orgId = route.paramMap.get('orgId');
    var searchId: string;
    if (orgId) {
        searchId = orgId;
    } else {
        searchId = _navMenuItemsV2Service.organization().id;
    }

    return _navMenuItemsV2Service.getAllProjectsByOrg(searchId).pipe(
        // Error here means the requested card is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        })
    );
};

/**
 * Card resolver
 *
 * @param route
 * @param state
 */
const boardResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const projectsV2Service = inject(ProjectsV2Service);
    const router = inject(Router);
    const boardId = route.paramMap.get('boardId');

    return projectsV2Service.getByIdProjectBoard(boardId).pipe(
        // Error here means the requested card is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        })
    );
};

/**
 * Card resolver
 *
 * @param route
 * @param state
 */
const listsResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const projectsV2Service = inject(ProjectsV2Service);
    const router = inject(Router);
    const boardId = route.paramMap.get('boardId');

    return projectsV2Service.getAllProjectLists(boardId).pipe(
        // Error here means the requested card is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        })
    );
};

const cardsResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const projectsV2Service = inject(ProjectsV2Service);
    const router = inject(Router);
    const boardId = route.paramMap.get('boardId');

    return projectsV2Service.getAllProjectCards(boardId).pipe(
        // Error here means the requested card is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        })
    );
};

const cardResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const projectsV2Service = inject(ProjectsV2Service);
    const router = inject(Router);
    const listId = route.paramMap.get('listId');
    const cardId = route.paramMap.get('cardId');

    return projectsV2Service.getByIdProjectCard(listId, cardId).pipe(
        // Error here means the requested card is not available
        catchError((error) => {
            // Log the error
            console.error(error);

            // Get the parent url
            const parentUrl = state.url.split('/').slice(0, -1).join('/');

            // Navigate to there
            router.navigateByUrl(parentUrl);

            // Throw an error
            return throwError(error);
        })
    );
};

export default [
    {
        path: '',
        component: ProjectsComponent,
        resolve: {
            loginUser: () => inject(ProjectsV2Service).initialize(), 
            projects: () => inject(ProjectsV2Service).getAllProjects(),
            // projects: projectsResolver,
            // board: boardResolver,
            // boards: () => inject(ScrumboardService).getBoards(),
        },
        children: [
            {
                path: ':boardId',
                component: ProjectsBoardComponent,
                resolve: {
                    loginUser: () => inject(ProjectsV2Service).initialize(),            
                    board: boardResolver,
                    lists: listsResolver,
                    cards: cardsResolver
                },
                children: [
                    {
                        path: 'card/:listId/:cardId',
                        component: ProjectsCardDrawerComponent,
                        resolve: {
                            card: cardResolver,
                        },
                    },
                    {
                        path: 'pdf/:boardId',
                        component: ProjectsPdfComponent,
                        resolve: {
                            loginUser: () => inject(ProjectsV2Service).initialize(),            
                            board: boardResolver,
                            lists: listsResolver,
                            cards: cardsResolver
                        },
                    },        
                ],
            },        
        ]
    },
    
        // children: [
        //     {
        //         path: '',
        //         component: ProjectsListComponent,
        //         resolve: {
        //             loginUser: () => inject(ProjectsV2Service).initialize(), 
        //             projects: projectsResolver,
        //         },
        //         children: [
        //             {
        //                 path: ':id',
        //                 component: ProjectsDetailsComponent,
        //                 resolve: {
        //                     loginUser: () => inject(ProjectsV2Service).initialize(), 
        //                     // mail: mailResolver,
        //                 },
        //             },
                
        //         ],
        //     },
        //     {
        //         path: 'settings',
        //         component: ProjectsSettingsComponent,
        //     },
        // ],
    // },  

] as Routes;

