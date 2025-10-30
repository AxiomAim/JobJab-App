import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
    Routes,
} from '@angular/router';
import { JobBoardBoardComponent } from 'app/modules/axiomaim/jobjab/job-board/board/board.component';
import { JobBoardBoardsComponent } from 'app/modules/axiomaim/jobjab/job-board/boards/boards.component';
import { JobBoardCardComponent } from 'app/modules/axiomaim/jobjab/job-board/card/card.component';
import { Board } from 'app/modules/axiomaim/jobjab/job-board/job-board.models';
import { JobBoardService } from 'app/modules/axiomaim/jobjab/job-board/job-board.service';
import { Observable, catchError, throwError } from 'rxjs';
import { JobsV2Service } from '../jobs/jobs-v2.service';

/**
 * Board resolver
 *
 * @param route
 * @param state
 */
const boardResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<Board> => {
    const scrumboardService = inject(JobBoardService);
    const router = inject(Router);

    return scrumboardService.getBoard(route.paramMap.get('boardId')).pipe(
        // Error here means the requested board is not available
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
const cardResolver = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const scrumboardService = inject(JobBoardService);
    const router = inject(Router);

    return scrumboardService.getCard(route.paramMap.get('cardId')).pipe(
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
    // {
    //     path: '',
    //     component: JobBoardBoardsComponent,
    //     resolve: {
    //         boards: () => inject(JobBoardService).getBoards(),
    //     },
    // },
    {
        path: '',
        component: JobBoardBoardComponent,
        resolve: {
            jobBoaardList: () => inject(JobsV2Service).getJobBoardList(),
        },
        // children: [
        //     {
        //         path: 'card/:cardId',
        //         component: JobBoardCardComponent,
        //         resolve: {
        //             card: cardResolver,
        //         },
        //     },
        // ],
    },
] as Routes;
