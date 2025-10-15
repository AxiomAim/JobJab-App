import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class TaskModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        userId: string,
        jobId: string,
        sort: number,
        type: 'task' | 'section',
        title: string,
        notes: string,
        completed: boolean,
        dueDate: string | null,
        priority: 0 | 1 | 2,
        tags: Tag[],
        order: number,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string
        ) {
            this.id = id;
            this.orgId = orgId;
            this.userId = userId;
            this.jobId = jobId;
            this.sort = sort;
            this.type = type;
            this.title = title;
            this.notes = notes;
            this.completed = completed;
            this.dueDate = dueDate;
            this.priority = priority;
            this.tags = tags;
            this.order = order;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public jobId: string;
    public sort: number;
    public type: 'task' | 'section';
    public title: string;
    public notes: string;
    public completed: boolean;
    public dueDate: string | null;
    public priority: 0 | 1 | 2;
    public tags: Tag[];
    public order: number;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Task): Task {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            userId: dto.userId ? dto.userId : '',
            jobId: dto.jobId ? dto.jobId : '',
            sort: dto.sort ? dto.sort : 0,
            type: dto.type ? dto.type : 'task',
            title: dto.title ? dto.title : '',
            notes: dto.notes ? dto.notes : '',
            completed: dto.completed ? dto.completed : false,
            dueDate: dto.dueDate ? dto.dueDate : null,
            priority: dto.priority ? dto.priority : 0,
            tags: dto.tags ? dto.tags : [],
            order: dto.order ? dto.order : 0,
            createdAt: dto.createdAt ? dto.createdAt : date,
            updatedAt: date,
            deletedAt: dto.deletedAt ? dto.deletedAt : null,
        };
    }

    public static emptyDto():Task {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            jobId: '',
            sort: 0,
            type: 'task',
            title: '',
            notes: '',
            completed: false,
            dueDate: null,
            priority: 0,
            tags: [],
            order: 0,
            createdAt: date,
            updatedAt: date,
            deletedAt: null,

        }
    }

    public static emptyDtoTag():Tag {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            title: '',
        }
    }
}

export interface Task  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    jobId: string;
    sort: number,
    type: 'task' | 'section';
    title: string;
    notes: string;
    completed: boolean;
    dueDate: string | null;
    priority: 0 | 1 | 2;
    tags: Tag[];
    order: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
}

export interface Tag {
    id?: string;
    title?: string;
}

