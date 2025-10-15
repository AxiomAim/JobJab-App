import { Scheme, Theme } from '@axiomaim/services/config';
import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { NoteLabel } from './notes-labels.model';
import { NoteTask } from './notes-tasks.model';


export class NoteModel implements BaseDto {
    constructor(
    id: string,
    orgId: string,
    userId: string,
    title?: string,
    content?: string,
    tasks?: NoteTask[],
    image?: string | null,
    labels?: NoteLabel[],
    archived?: boolean,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,    

        ) {
            this.id = id;
            this.orgId = orgId;
            this.userId = userId;
            this.title = title;
            this.content = content;
            this.tasks = tasks;
            this.image = image;
            this.labels = labels;
            this.archived = archived;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;            
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public title?: string;
    public content?: string;
    public tasks?: NoteTask[];
    public image?: string | null;
    public labels?: NoteLabel[];
    public archived?: boolean;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Note): Note {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            userId: dto.userId ? dto.userId : '',
            title: dto.title ? dto.title : '',
            content: dto.content ? dto.content : '',
            tasks: dto.tasks ? dto.tasks : [],
            image: dto.image ? dto.image : null,
            labels: dto.labels ? dto.labels : [],
            archived: dto.archived ? dto.archived : false,
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: dto.updatedAt ? dto.updatedAt : null,
            deletedAt: dto.deletedAt ? dto.deletedAt : null,
        };
    }

    public static emptyDto(): Note {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            title: '',
            content: '',
            tasks: [],
            image: null,
            labels: [],
            archived: false,
            createdAt: date,
            updatedAt: null,
            deletedAt: null,

        }
    }
}

export interface Note  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    title?: string;
    content?: string;
    tasks?: NoteTask[];
    image?: string | null;
    labels?: NoteLabel[];
    archived?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}
