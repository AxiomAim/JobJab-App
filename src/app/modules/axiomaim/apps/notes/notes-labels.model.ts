import { Scheme, Theme } from '@axiomaim/services/config';
import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import * as v from 'valibot';


export class NoteLebelModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        userId: string,
        title?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.userId = userId;
            this.title = title;
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public title?: string;

    public static toDto(dto: NoteLabel): NoteLabel {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            userId: dto.userId ? dto.userId : '',
            title: dto.title ? dto.title : '',
        };
    }

    public static emptyDto(): NoteLabel {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            title: '',
        }
    }
}

export interface NoteLabel  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    title?: string;
}


