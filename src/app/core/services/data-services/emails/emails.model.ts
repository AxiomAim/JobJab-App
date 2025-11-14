import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';

export class EmailModel {

    constructor(
        id: string,
        orgId: string,
        contactId: string,
        type?: string,
        from?: {
            avatar?: string,
            contact?: string,
        },
        to?: string,
        cc?: string[],
        ccCount?: number,
        bcc?: string[],
        bccCount?: number,
        date?: string,
        subject?: string,
        content?: string,
        attachments?: {
            type?: string,
            name?: string,
            size?: number,
            preview?: string,
            downloadUrl?: string,
        }[],
        starred?: boolean,
        important?: boolean,
        unread?: boolean,
        folder?: string,
        labels?: string[],

        ) {
        this.id = id;
        this.orgId = orgId;
        this.contactId = contactId;
        this.type = type;
        this.from = from;
        this.to = to;
        this.cc = cc;
        this.ccCount = ccCount;
        this.bcc = bcc;
        this.bccCount = bccCount;
        this.date = date;
        this.subject = subject;
        this.content = content;
        this.attachments = attachments;
        this.starred = starred;
        this.important = important;
        this.unread = unread;
        this.folder = folder;
        this.labels = labels;

    }

    public id: string;
    public orgId: string;
    public contactId: string;
    public type?: string;
    public from?: {
        avatar?: string,
        contact?: string,
    };
    public to?: string;
    public cc?: string[];
    public ccCount?: number;
    public bcc?: string[];
    public bccCount?: number;
    public date?: string;
    public subject?: string;
    public content?: string;
    public attachments?: {
        type?: string,
        name?: string,
        size?: number,
        preview?: string,
        downloadUrl?: string,
    }[];
    public starred?: boolean;
    public important?: boolean;
    public unread?: boolean;
    public folder?: string;
    public labels?: string[];


    public static emptyDto(): Email {
        return {
            id: uuidv4().toString(),
            orgId: null,
            contactId: null,
            type: '',
            from: {},
            to: '',
            cc: [],
            ccCount: 0,
            bcc: [],
            bccCount: 0,
            date: '',
            subject: '',
            content: '',
            attachments: [],
            starred: false,
            important: false,
            unread: true,
            folder: '',
            labels: [],
        }
    }

    public static toDto(dto: Email): Email {
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                orgId: dto.orgId ? dto.orgId : null,
                contactId: dto.contactId ? dto.contactId : null,
                type: dto.type ? dto.type : '',
                from: dto.from ? dto.from : {},
                to: dto.to ? dto.to : '',
                cc: dto.cc ? dto.cc : [],
                ccCount: dto.ccCount ? dto.ccCount : 0,
                bcc: dto.bcc ? dto.bcc : [],
                bccCount: dto.bccCount ? dto.bccCount : 0,
                date: dto.date ? dto.date : '',
                subject: dto.subject ? dto.subject : '',
                content: dto.content ? dto.content : '',
                attachments: dto.attachments ? dto.attachments : [],
                starred: dto.starred ? dto.starred : false,
                important: dto.important ? dto.important : false,
                unread: dto.unread ? dto.unread : true,
                folder: dto.folder ? dto.folder : '',
                labels: dto.labels ? dto.labels : [],
            };
        }
    
}

export interface Email extends BaseDto {
    id: string;
    orgId: string;
    contactId: string;
    type?: string;
    from?: {
        avatar?: string;
        contact?: string;
    };
    to?: string;
    cc?: string[];
    ccCount?: number;
    bcc?: string[];
    bccCount?: number;
    date?: string;
    subject?: string;
    content?: string;
    attachments?: {
        type?: string;
        name?: string;
        size?: number;
        preview?: string;
        downloadUrl?: string;
    }[];
    starred?: boolean;
    important?: boolean;
    unread?: boolean;
    folder?: string;
    labels?: string[];
}


