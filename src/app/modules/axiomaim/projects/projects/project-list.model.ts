import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { ProjectCard } from './project-card.model';

export class ProjectListModel {
    constructor(
        id: string,
        orgId?: string,
        userId?: string,
        boardId?: string,
        sort?: string,
        position?: number,
        title?: string,
                ) {
        this.id = id;
        this.orgId = orgId;
        this.userId = userId;
        this.boardId = boardId;
        this.sort = sort;
        this.position = position;
        this.title = title;
                
    }

    public id: string;
    public orgId: string;   
    public userId: string;
    public boardId: string;
    public sort: string;
    public position: number;
    public title: string;

    public static emptyDto(): ProjectList {
        let datetime: any = new Date().toISOString();

        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            boardId: '',
            sort: 1,
            position: 1,
            title: '',
        }
    }

    public static toDto(dto: ProjectList): ProjectList {
        let datetime: any = new Date().toISOString();
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : '',
                userId: dto.userId ? dto.userId : '',
                boardId: dto.boardId ? dto.boardId : '',
                sort: dto.sort ? dto.sort : 1,
                position: dto.position ? dto.position : 0,
                title: dto.title ? dto.title : '',

            };
        }    
}


export interface ProjectList extends BaseDto {
    id: string;
    orgId?: string;
    userId?: string;
    boardId?: string;
    sort?: number;
    position?: number;
    title?: string;
}






