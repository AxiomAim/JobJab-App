import { Scheme, Theme } from '@axiomaim/services/config';
import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';


export class NoteTaskModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        userId: string,
        content?: string,
        completed?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.userId = userId;
            this.content = content;
            this.completed = completed;
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public content?: string;
    public completed?: string;

    public static toDto(dto: NoteTask): NoteTask {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            userId: dto.userId ? dto.userId : '',
            content: dto.content ? dto.content : '',
            completed: dto.completed ? dto.completed : '',
        };
    }

    public static emptyDto(): NoteTask {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            content: '',
            completed: '',
 
        }
    }
}

export interface NoteTask  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    content?: string;
    completed?: string;
}


