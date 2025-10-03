import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class NotificationModel implements BaseDto {
    constructor(
            id: string,
            orgId: string,
            icon?: string,
            image?: string,
            title?: string,
            description?: string,
            time?: string,
            link?: string,
            useRouter?: boolean,
            read?: boolean,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.icon = icon;
            this.image = image;
            this.title = title;
            this.description = description;
            this.time = time;
            this.link = link;
            this.useRouter = useRouter;
            this.read = read;
    }
    public id: string;
    public orgId: string;
    public icon?: string;
    public image?: string;
    public title?: string;
    public description?: string;
    public time: string;
    public link?: string;
    public useRouter?: boolean;
    public read: boolean;

    public static toDto(dto: Notification): Notification {
        let date: any = new Date().toISOString();
        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            icon: dto.icon ? dto.icon : '',
            image: dto.image ? dto.image : '',
            title: dto.title ? dto.title : '',
            description: dto.description ? dto.description : '',
            time: dto.time ? dto.time : '',
            link: dto.link ? dto.link : '',
            useRouter: dto.useRouter !== undefined ? dto.useRouter : false,
            read: dto.read !== undefined ? dto.read : false,
        };
    }

    public static emptyDto():Notification {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            icon: '',
            image: '',
            title: '',
            description: '',
            time: date,
            link: '',
            useRouter: false,
            read: false,
        }
    }
}

export interface Notification  extends BaseDto {
    id: string;
    orgId: string;
    icon?: string;
    image?: string;
    title?: string;
    description?: string;
    time?: string;
    link?: string;
    useRouter?: boolean;
    read?: boolean;
}

