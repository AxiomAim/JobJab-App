import { createInjectable } from "ngxtension/create-injectable";
import { signal, computed, inject } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { FirestoreQuery } from "app/core/auth-firebase/firestore.service";
import { FirebaseAuthV2Service } from "app/core/auth-firebase/firebase-auth-v2.service";
import { cloneDeep } from "lodash";
import { Organization } from "../../administration/organizations/organizations.model";
import { User } from "../../administration/users/users.model";
import { Project } from "./project.model";
import { ProjectsDataService } from "./projects-data.service";
import { ProjectBoard } from "./project-board.model";
import { ProjectCard, ProjectCardModel } from "./project-card.model";
import { ProjectList } from "./project-list.model";
import { ProjectLabel } from "./project-label.model";
import { ProjectBoardsDataService } from "./project-boards-data.service";
import { ProjectListsDataService } from "./project-lists-data.service";
import { ProjectLabelsDataService } from "./project-labels-data.service";
import { ProjectCardsDataService } from "./project-cards-data.service";
import { UsersV2Service } from "../../administration/users/usersV2.service";
import { SupportTicketsDataService } from "./project-cards-data-support-tickets.service";

const PROJECT = "project";
const LOGIN_USER = "loginUser";
const ORGANIZATION = "organization";

const PROJECT_BOARDS = "projectBoards";
const PROJECT_BOARD = "projectBoard";
const PROJECT_CARDS = "projectCards";
const PROJECT_CARD = "projectCard";
const PROJECT_LISTS = "projectLists";
const PROJECT_LIST = "projectList";
const PROJECT_LABELS = "projectLabels";
const PROJECT_LABEL = "projectLabel";
const PROJECT_MEMBERS = "projectUsers";
const PROJECT_MEMBER = "projectUser";


export const ProjectsV2Service = createInjectable(() => {
  const _router = inject(Router);
  const _firebaseAuthV2Service = inject(FirebaseAuthV2Service);
  const _projectsDataService = inject(ProjectsDataService);
  const _projectBoardsDataService = inject(ProjectBoardsDataService);
  const _projectCardsDataService = inject(ProjectCardsDataService);
  const _projectListsDataService = inject(ProjectListsDataService);
  const _projectLabelsDataService = inject(ProjectLabelsDataService);
  const _usersV2Service = inject(UsersV2Service);
  const _supportTicketsDataService = inject(SupportTicketsDataService);

  const projects = signal<Project[] | null>([]);
  const project = signal<Project | null>(null);
  const myprojects = signal<Project[] | null>([]);
  const projectBoards = signal<ProjectBoard[] | null>([]);
  const projectBoard = signal<ProjectBoard | null>(null);
  const projectCards = signal<ProjectCard[] | null>([]);
  const projectCard = signal<ProjectCard | null>(null);
  const projectLists = signal<ProjectList[] | null>([]);
  const projectList = signal<ProjectList | null>(null);
  const projectLabels = signal<ProjectLabel[] | null>([]);
  const projectLabel = signal<ProjectLabel | null>(null);
  
  const allUsers = signal<User[] | null>([]);
  const loginUser = signal<User | null>(null);
  const organization = signal<Organization | null>(null);
  const error = signal<string | null>(null);

  const initialize = (): Observable<any> => {
    return new Observable<any>((observer) => {
      // _firebaseAuthV2Service.setLayout('centered');
      loginUser.set(_firebaseAuthV2Service.loginUser());
      organization.set(_firebaseAuthV2Service.organization());
      const response = {
        loginUser: loginUser(),
        organization: organization(),
      }
      if(response) {
          observer.next(response);
        } else {
          observer.error('Object not found');
        }
        observer.complete();
    });
  }

// getAllProjects
  const getloginUser = (): Observable<User> => {
    return new Observable<User>((observer) => {
      loginUser.set(_firebaseAuthV2Service.loginUser());
      organization.set(_firebaseAuthV2Service.organization());
      if(loginUser()) {
          observer.next(loginUser());
        } else {
          observer.error('Object not found');
        }
        observer.complete();
    });
  }
  
  const getAllProjects = (): Observable<Project[]> => {
      return _projectsDataService.getAll().pipe(take(1), tap((res) => {            
          projects.set(res);
          return projects();
      }));
  };

  const getAllBoards = (): Observable<Project[]> => {
    return _projectBoardsDataService.getAll().pipe(tap((res: any) => {            
        projectBoards.set(res);
        return projects();
    }));
};

const getAllLists = (): Observable<Project[]> => {
  return _projectListsDataService.getAll().pipe(tap((res: any) => {            
      projectLists.set(res);
      return projects();
  }));
};

const getAllCards = (): Observable<Project[]> => {
  return _projectCardsDataService.getAll().pipe(tap((res: any) => {            
      projectCards.set(res);
      return projects();
  }));
};
const getMyProjects = (userId: string): Observable<Project[]> => {

    return _projectsDataService.getAll().pipe(take(1), tap((res) => {            
        projects.set(res);
        return projects();
    }));
};

const getAllProjectsByOrg = (id?: string): Observable<Project[]> => {
    const searchId = id ? id : organization().id;
    error.set(null);
    return _projectsDataService.getQuery('orgId', '==', searchId).pipe(take(1),tap((res) => {   
      projects.set(res);
      return projects();
    }));
  };

  const getAllProjectBoards = (projectId: string): Observable<ProjectBoard[]> => {
  return new Observable<ProjectBoard[]>((observer) => {
    _projectBoardsDataService.getQuery('projectId', '==', projectId).pipe(take(1), tap((res) => {            
        if(res.length > 0) {
            projectBoards.set(res);
            observer.next(res);
          } else {
            observer.next([]);
            observer.error('Object not found');
          }
          observer.complete();
        })).subscribe();
    })
};

const getAllProjectCards = (boardId: string): Observable<ProjectCard[]> => {
    error.set(null);
    const whereclause: FirestoreQuery[] = [];
    const clause1: FirestoreQuery = { field: 'boardId', operation: '==', searchKey: boardId
     };
    whereclause.push(clause1);
    return _projectCardsDataService.getQueryWhereclause(whereclause).pipe(take(1), tap((res) => {            
        if(res.length > 0) {
            projectCards.set(res);
            return projectCards();
        }
    }));
};

const getAllProjectLists = (boardId: string): Observable<ProjectList[]> => {
  return _projectListsDataService.getQuery('boardId', '==', boardId).pipe(take(1), tap((res) => {
    projectLists.set(res);
    return projectLists();
  }));
};

const getAllProjectLabels = (boardId: string): Observable<ProjectLabel[]> => {
  return new Observable<ProjectLabel[]>((observer) => {
  error.set(null);
  const whereclause: FirestoreQuery[] = [];
  const clause1: FirestoreQuery = { field: 'boardId', operation: '==', searchKey: boardId
   };
  whereclause.push(clause1);
  return _projectLabelsDataService.getQueryWhereclause(whereclause).pipe(take(1), tap((res) => {            
    projectLabels.set(res);
    observer.next(res);
    observer.complete();
    return projectLabels();
      })).subscribe();
  })
};

// getByIdProjects
const getProjectById = (id: string): Observable<Project> => {
  return new Observable<Project>((observer) => {    
    _projectsDataService.getItem(id).pipe(tap((res: any) => {
      project.set(res);
      observer.next(project());
      observer.complete();  
    })).subscribe();
  })
};

const getAllUsers = (): Observable<User[]> => {
  error.set(null);
  return _usersV2Service.getAll().pipe(take(1), tap((res) => {            
      if(res.length > 0) {
          allUsers.set(res);
          return allUsers();
      }
  }));
};


const getByIdProjectBoard = (id: string): Observable<ProjectBoard> => {
   return  _projectBoardsDataService.getItem(id).pipe(switchMap((resBoard: any) => {            
            projectBoard.set(resBoard);
            return _projectListsDataService.getQuery('boardId', '==', id).pipe(map((resLists) => {
              projectLists.set(resLists);
              return projectBoard();
        }));
    }));
};

const getByIdProjectList = (listId: string): Observable<ProjectList> => {
  return new Observable<ProjectList>((observer) => {
    observer.next(projectList());
    observer.complete();
  });
};

const getByIdProjectCard = (listId: string, CardId: string): Observable<ProjectCard> => {
    return _projectCardsDataService.getItem(CardId).pipe(tap((res: any) => {
      projectCard.set(res);
      return projectCard();
    }));
};


const getByIdProjectLabel = (id: string): Observable<ProjectLabel> => {
  return new Observable<ProjectLabel>((observer) => {
    _projectLabelsDataService.getItem(id).pipe(tap((res: any) => {            
            projectLabel.set(res);
            observer.next(res);
          observer.complete();
        })).subscribe();
    })
};

const createProject = (item: Project): Observable<Project> => {
  return _projectsDataService.createItem(item).pipe(
    map((createdItem) => {
      projects.set([...projects(), createdItem]);
      project.set(createdItem);
      return project();
    })
  );
}

const createProjectBoard = (item: ProjectBoard): Observable<ProjectBoard> => {
  return _projectBoardsDataService.createItem(item).pipe(
    map((createdItem) => {
      projectBoards.set([...projectBoards(), createdItem]);
      projectBoard.set(createdItem);
      return createdItem;
    })
  );
}

const createProjectCard = (item: ProjectCard): Observable<ProjectCard> => {
  return _projectCardsDataService.createItem(item).pipe(
    map((createdItem) => {
      projectCards.set([...projectCards(), createdItem]);
      projectCard.set(createdItem);
      return createdItem;
    })
  );
}

const createProjectList = (item: ProjectList): Observable<ProjectList> => {
  return _projectListsDataService.createItem(item).pipe(
    map((createdItem) => {
      projectLists.set([...projectLists(), createdItem]);
      projectList.set(createdItem);
      return createdItem;
    })
  );
}

const createProjectLabel = (item: ProjectLabel): Observable<ProjectLabel> => {
  return _projectLabelsDataService.createItem(item).pipe(
    map((createdItem) => {
      projectLabels.set([...projectLabels(), createdItem]);
      projectLabel.set(createdItem);
      return createdItem;
    })
  );
}


const deleteProject = (id): Observable<Project> => {
  return new Observable<Project>((observer) => {
    _projectsDataService.deleteItem(id).pipe(
      map(() => {
        // Find the index of the deleted user
        const idx = projects().findIndex((item) => item.id === id);

        // Delete the user
        const deletedCsvObject = projects().splice(idx, 1)[0];

        // Notify the observer
        observer.next(deletedCsvObject);
        observer.complete();
      })
    ).subscribe();
  });
};

const deleteProjectBoard = (id): Observable<ProjectBoard> => {
  return new Observable<ProjectBoard>((observer) => {
    _projectBoardsDataService.deleteItem(id).pipe(
      map(() => {
        // Find the index of the deleted user
        const idx = projectBoards().findIndex((item) => item.id === id);

        // Delete the user
        const deletedCsvObject = projectBoards().splice(idx, 1)[0];

        // Notify the observer
        observer.next(deletedCsvObject);
        observer.complete();
      })
    ).subscribe();
  });
};


const deleteProjectCard = (id): Observable<ProjectCard> => {
  return new Observable<ProjectCard>((observer) => {
    _projectCardsDataService.deleteItem(id).pipe(
      map(() => {
        // Find the index of the deleted user
        const idx = projectCards().findIndex((item) => item.id === id);

        // Delete the user
        const deletedCsvObject = projectCards().splice(idx, 1)[0];

        // Notify the observer
        observer.next(deletedCsvObject);
        observer.complete();
      })
    ).subscribe();
  });
};

const deleteProjectList = (id): Observable<ProjectList> => {
  return new Observable<ProjectList>((observer) => {
    _projectListsDataService.deleteItem(id).pipe(
      map(() => {
        // Find the index of the deleted user
        const idx = projectLists().findIndex((item) => item.id === id);

        // Delete the user
        const deletedLists = projectLists().splice(idx, 1)[0];

        // Notify the observer
        observer.next(deletedLists);
        observer.complete();
      })
    ).subscribe();
  });
};


const deleteProjectLabel = (id): Observable<ProjectLabel> => {
  return new Observable<ProjectLabel>((observer) => {
    _projectLabelsDataService.deleteItem(id).pipe(
      map(() => {
        // Find the index of the deleted user
        const idx = projectLabels().findIndex((item) => item.id === id);

        // Delete the user
        const deletedLabels = projectLabels().splice(idx, 1)[0];

        // Notify the observer
        observer.next(deletedLabels);
        observer.complete();
      })
    ).subscribe();
  });
};


const updateProject = (id: string, item: Project): Observable<Project> => {
  return new Observable<Project>((observer) => {
    _projectsDataService.updateItem(item).pipe(map(
      (updatedItem) => {
        // Find the index of the updated user
        const index = projects().findIndex(
          (item) => item.id === id
        );
        // Update the user
        project[index] = updatedItem;

        // Update the users
        projects.set([...projects()]);
        // Notify the observer
        observer.next(updatedItem);
        observer.complete();
      })).subscribe();
  });
}

const updateProjectBoard = (id: string, item: ProjectBoard): Observable<ProjectBoard> => {
  return new Observable<ProjectBoard>((observer) => {
    _projectBoardsDataService.updateItem(item).pipe(map(
      (updatedItem) => {
        // Find the index of the updated user
        const index = projectBoards().findIndex(
          (item) => item.id === id
        );
        // Update the user
        projectBoards[index] = updatedItem;

        // Update the users
        projectBoards.set([...projectBoards()]);
        // Notify the observer
        observer.next(updatedItem);
        observer.complete();
      })).subscribe();
  });
}

const updateProjectCard = (id: string, item: ProjectCard): Observable<ProjectCard> => {
    return _projectCardsDataService.updateItem(item).pipe(map(
      (updatedItem) => {
        projectCard.set(updatedItem);
        const cards = projectCards();
        // Find the index of the updated user
        const index = cards.findIndex(
          (item) => item.id === id
        );
        // Update the user
        cards[index] = updatedItem;
        projectCards.set(cards);
        // Update the users
        // projectCards.set([...projectCards()]);
        // Notify the observer

        return projectCard();
      }));
}

const updateProjectList = (id: string, item: ProjectList): Observable<ProjectList> => {
  return new Observable<ProjectList>((observer) => {
    _projectListsDataService.updateItem(item).pipe(map(
      (updatedItem) => {
        // Find the index of the updated user
        const index = projectLists().findIndex(
          (item) => item.id === id
        );
        // Update the user
        projectLists[index] = updatedItem;

        // Update the users
        projectLists.set([...projectLists()]);
        // Notify the observer
        observer.next(updatedItem);
        observer.complete();
      })).subscribe();
  });
}

const updateProjectLabel = (id: string, item: ProjectLabel): Observable<ProjectLabel> => {
  return new Observable<ProjectLabel>((observer) => {
    _projectLabelsDataService.updateItem(item).pipe(map(
      (updatedItem) => {
        // Find the index of the updated user
        const index = projectLabels().findIndex(
          (item) => item.id === id
        );
        // Update the user
        projectLabels[index] = updatedItem;

        // Update the users
        projectLabels.set([...projectLabels()]);
        // Notify the observer
        observer.next(updatedItem);
        observer.complete();
      })).subscribe();
  });
}

const search = (query: string): Observable<Project[]> => {
  return new Observable<Project[]>((observer) => {
    // Clone the contacts
    let resItems = cloneDeep(projects());
    // If the query exists...
    if (query) {
      // Filter the contacts
      resItems = resItems.filter(
          (project) =>
              project.title &&
              project.title
                  .toLowerCase()
                  .includes(query.toLowerCase())
      );
      resItems.sort((a, b) => a.title.localeCompare(b.title));
    }
    observer.next(resItems);
    observer.complete();
  });
}


const bulkUpdateProjectList = (items: ProjectList[]): Observable<ProjectList[]> => {
  return new Observable<ProjectList[]>((observer) => {
    _projectListsDataService.bulkUpdate(items).pipe(map(
      (updatedItems) => {
        projectLists.set(updatedItems);
        observer.next(updatedItems);
        observer.complete();
      })).subscribe();
  });
}

const bulkCreateProjectList = (items: ProjectList[]): Observable<ProjectList[]> => {
  return new Observable<ProjectList[]>((observer) => {
    _projectListsDataService.bulkCreate(items).pipe(map(
      (updatedItems) => {
        projectLists.set(updatedItems);
        observer.next(updatedItems);
        observer.complete();
      })).subscribe();
  });
}

const searchProjectBoards = (query: string): Observable<ProjectBoard[]> => {
  return new Observable<ProjectBoard[]>((observer) => {
    // Clone the contacts
    let resItems = cloneDeep(projectBoards());
    // If the query exists...
    if (query) {
      // Filter the contacts
      resItems = resItems.filter(
          (project) =>
              project.title &&
              project.title
                  .toLowerCase()
                  .includes(query.toLowerCase())
      );
      resItems.sort((a, b) => a.title.localeCompare(b.title));
    }
    observer.next(resItems);
    observer.complete();
  });
}

const importSupportTickets = (): Observable<ProjectCard[]> => {  
  var updatedCards: ProjectCard[] = [];
    return _supportTicketsDataService.getAll().pipe(switchMap((allCards) => {
      allCards.forEach((thisCard) => {    
        const newCard: ProjectCard = ProjectCardModel.ticketToCardDto(thisCard);  
        // const mergedCard = {...thisCard, ...newCard};
        console.log('mergedCard', newCard)
        updatedCards.push(newCard); 
      });
      console.log('updatedCards', updatedCards)
    
      return _projectCardsDataService.bulkCreate(updatedCards).pipe(map((resCards) => {
        console.log('bulkCreate', resCards)
        return resCards;
      }));    
  }));
};

const updateSupportTickets = (): Observable<ProjectCard[]> => {  
  var updatedCards: ProjectCard[] = [];
    return _projectCardsDataService.getAll().pipe(switchMap((allCards) => {
      allCards.forEach((thisCard) => {    
        thisCard.assign_userName = thisCard.Assignee;
        switch(thisCard.Assignee) {
          case 'Thomas Powell':
            thisCard.assign_userName = thisCard.Assignee;
            thisCard.assign_userId = 'WN47FYK7BigXEmpXhNGkrdgiBUs2';
            thisCard.assign_userEmail = 'tom@davesa.com';
            break;
          case 'Vishrut Naik':
            thisCard.assign_userName = thisCard.Assignee;
            thisCard.assign_userId = 'YDf6eT4bVrfYBSNTtYPGvODtjr02';
            thisCard.assign_userEmail = 'vishrut@davesa.com';
            break;
          case 'Mitesh Sathvara':
            thisCard.assign_userName = thisCard.Assignee;
            thisCard.assign_userId = 'tw3hc8BwASZscsMay7gNRsoMo3G3';
            thisCard.assign_userEmail = 'mitesh@davesa.com';
            break;
          case 'Sufiyan Malek':
            thisCard.assign_userName = thisCard.Assignee;
            thisCard.assign_userId = 'HKZd1OPT2pQjChnukfIbXV87Fc23';
            thisCard.assign_userEmail = 'mitesh@davesa.com';
            break;
          default:
            thisCard.assign_userName = 'Thomas Powell';
            thisCard.assign_userId = 'WN47FYK7BigXEmpXhNGkrdgiBUs2';
            thisCard.assign_userEmail = 'tom@davesa.com';
            break
        }

        console.log('mergedCard', thisCard)
        updatedCards.push(thisCard); 
      });
      console.log('updatedCards', updatedCards)
    
      return _projectCardsDataService.bulkUpdate(updatedCards).pipe(map((resCards) => {
        console.log('bulkCreate', resCards)
        return resCards;
      }));    
  }));
};


  return {    
    // allMenusItems: computed(() => allMenusItems()),
    projects: computed(() => projects()),
    project: computed(() => project()),
    myprojects: computed(() => myprojects()),
    projectBoards: computed(() => projectBoards()),
    projectBoard: computed(() => projectBoard()),
    projectCards: computed(() => projectCards()),
    projectCard: computed(() => projectCard()),
    projectLists: computed(() => projectLists()),
    projectList: computed(() => projectList()),
    projectLabels: computed(() => projectLabels()),
    projectLabel: computed(() => projectLabel()),
    allUsers: computed(() => allUsers()),
    loginUser: computed(() => loginUser()),
    organization: computed(() => organization()),
    search,
    getloginUser,
    bulkUpdateProjectList,
    bulkCreateProjectList,
    initialize,
    getAllProjects,
    getAllProjectsByOrg,
    getAllProjectBoards,
    getAllProjectCards,
    getAllProjectLists,
    getAllProjectLabels,
    getByIdProjectBoard,
    getByIdProjectCard,
    getByIdProjectList,
    getByIdProjectLabel,
    getProjectById,
    createProject,
    createProjectBoard,
    createProjectCard,
    createProjectList,
    createProjectLabel,
    deleteProject,
    deleteProjectBoard,
    deleteProjectCard,
    deleteProjectList,
    deleteProjectLabel,
    updateProject,
    updateProjectBoard,
    updateProjectCard,
    updateProjectList,
    updateProjectLabel,
    searchProjectBoards,
    getAllUsers,
    importSupportTickets,
    getAllBoards,
    getAllLists,
    getAllCards,
    updateSupportTickets

  };
});

