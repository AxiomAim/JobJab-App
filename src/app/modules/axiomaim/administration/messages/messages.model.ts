import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class MessageModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        userId: string,
        image: string,
        title: string,
        description: string,
        html: string,
        link: string,
        read: boolean,
        userRouter: boolean,
        createdAt?: string,
        readAt?: string,
        deletedAt?: string
        ) {
            this.id = id;
            this.orgId = orgId;
            this.userId = userId;
            this.image = image;
            this.title = title;
            this.description = description;
            this.html = html;
            this.link = link;
            this.read = read;
            this.userRouter = userRouter;
            this.createdAt = createdAt;
            this.readAt = readAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public userId: string;
    public image: string;
    public title: string;
    public description: string;
    public html: string;
    public link: string;
    public read: boolean;
    public userRouter: boolean;
    public createdAt?: string;
    public readAt?: string;
    public deletedAt?: string;

    public static toDto(dto: Message): Message {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            userId: dto.userId ? dto.userId : '',
            image: dto.image ? dto.image : '',
            title: dto.title ? dto.title : '',
            description: dto.description ? dto.description : '',
            html: dto.html ? dto.html : '',
            link: dto.link ? dto.link : '',
            read: dto.read ? dto.read : false,
            userRouter: dto.userRouter ? dto.userRouter : false,
            createdAt: dto.createdAt ? dto.createdAt : date,
            readAt: dto.readAt ? dto.readAt : '',
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto():Message {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            userId: '',
            image: '',
            title: '',
            description: '',
            html: '',
            link: '',
            read: false,
            userRouter: false,
            createdAt: date,
            readAt: '',
            deletedAt: '',
        }
    }
}

export interface Message  extends BaseDto {
    id: string;
    orgId: string;
    userId: string;
    image: string;    
    title: string;
    description: string;
    html: string;
    link: string;
    read: boolean;
    userRouter: boolean;
    createdAt?: string;
    readAt?: string;
    deletedAt?: string;    
}

