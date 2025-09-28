import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ProjectModel {
    constructor(
        id: string,
        orgId?: string,
        userId?: string,
        templateId?: string,
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
        this.templateId = templateId
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
    public templateId?: string;
    public boardId?: string;
    public title?: string;
    public subtitle?: string;
    public icon: string;
    public slug: string;
    public count: number;

    public static emptyDto(): Project {
        let datetime: any = new Date().toISOString();

        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            templateId: '',
            boardId: '',
            title: '',
            subtitle: '',
            icon: '',
            slug: '',
            count: 0,
        }
    }

    public static toDto(dto: Project): Project {
        let datetime: any = new Date().toISOString();
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : '',
                userId: dto.userId ? dto.userId : '',
                templateId: dto.templateId ? dto.templateId : '',
                boardId: dto.boardId ? dto.boardId : '',
                title: dto.title ? dto.title : '',
                subtitle: dto.subtitle ? dto.subtitle : '',
                icon: dto.icon ? dto.icon : '',
                slug: dto.slug ? dto.slug : '',
                count: dto.count ? dto.count : 0,
            };
        }    
}


export interface Project extends BaseDto {
    id: string;
    orgId?: string;
    userId?: string;
    templateId?: string;
    boardId?: string;
    title?: string;
    subtitle?: string;
    icon?: string;
    slug?: string;
    count?: number;
}

