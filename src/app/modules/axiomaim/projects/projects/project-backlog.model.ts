import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ProjectBacklogModel {
    constructor(
        id: string,
        orgId?: string,
        userId?: string,
        boardId?: string,
        title?: string,
        subtitle?: string,
        icon?: string,
        slug?: string,
        count?: number,
                        ) {
        this.id = id;
        this.orgId = orgId;
        this.userId = userId;
        this.boardId = boardId;
        this.title = title;
        this.subtitle = subtitle;
        this.icon = icon;
        this.slug = slug;
        this.count = count;
                
    }

    public id: string;
    public orgId?: string;
    public userId?: string;
    public boardId?: string;
    public title?: string;
    public subtitle?: string;
    public icon: string;
    public slug: string;
    public count: number;

    public static emptyDto(): ProjectBacklog {
        let datetime: any = new Date().toISOString();

        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            boardId: '',
            title: '',
            subtitle: '',
            icon: '',
            slug: '',
            count: 0,
        }
    }

    public static toDto(dto: ProjectBacklog): ProjectBacklog {
        let datetime: any = new Date().toISOString();
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : '',
                userId: dto.userId ? dto.userId : '',
                boardId: dto.boardId ? dto.boardId : '',
                title: dto.title ? dto.title : '',
                subtitle: dto.subtitle ? dto.subtitle : '',
                icon: dto.icon ? dto.icon : '',
                slug: dto.slug ? dto.slug : '',
                count: dto.count ? dto.count : 0,
            };
        }    
}


export interface ProjectBacklog extends BaseDto {
    id: string;
    orgId?: string;
    userId?: string;
    boardId?: string;
    title?: string;
    subtitle?: string;
    icon?: string;
    slug?: string;
    count?: number;
    archiveAt?: string;
    boardAt?: string;
}

