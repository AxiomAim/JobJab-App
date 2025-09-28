import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class ProjectLabelModel {
    constructor(
        id: string,
        boardId: string,
        title: string,
                        ) {
        this.id = id;
        this.boardId = boardId;
        this.title = title;
                
    }

    public id: string;
    public boardId: string;
    public title: string;

    public static emptyDto(): ProjectLabel {
        let datetime: any = new Date().toISOString();

        return {
            id: uuidv4().toString(),
            boardId: '',
            title: '',
        }
    }

    public static toDto(dto: ProjectLabel): ProjectLabel {
        let datetime: any = new Date().toISOString();
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                boardId: dto.boardId ? dto.boardId : '',
                title: dto.title ? dto.title : '',
            };
        }    
}


export interface ProjectLabel extends BaseDto {
    id: string;
    boardId: string;
    title: string;
}






