import { v4 as uuidv4 } from 'uuid';
import { Scheme, Theme } from '@axiomaim/services/config';

export class OrganizationModel {

    constructor(
        id: string,
        domain: string,
        avatar?: string,
        avatarUrl?: string,
        avatarPath?: string,
        avatarFile?: string,
        avatarType?: string,
        background?: string,
        theme?: Theme,
        scheme?: Scheme,        
        name?: string,
        emails?: Email[],
        phoneNumbers?: PhoneNumber[],
        attachments?: Attachment,
        title?: string,
        company?: string,
        birthday?: string | null,
        address?: string | null,
        notes?: string | null,
        tags?: string[],
        orgId?: string,
        firstTime?: boolean,
        staffId?: number, 
        staff?: boolean, 
        projectId?: string,
        activeOrg?: boolean,
        developer?: boolean,        
        superAdmin?: boolean,
        systemAdmin?: boolean,
        csvAudit?: boolean,
        csvUser?: boolean,
        csvTester?: boolean,
        csvAdmin?: boolean,
        axiomaimUser?: boolean,
        axiomaimAdmin?: boolean,
        siteAdmin?: boolean,
        covidNotify?: boolean,
        covidNurse?: boolean,
        userName?: string,
        emailSignature?: string,
        linkedIn?: string,
        token?: string,
        web_token?: string,
        tokenDate?: string,
        status?: string,
        platform?: string,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
    
                ) {
        this.id = id;
        this.domain = domain;
        this.avatar = avatar;
        this.avatarUrl = avatarUrl;
        this.avatarPath = avatarPath;
        this.avatarFile = avatarFile;
        this.avatarType = avatarType;
        this.background = background;
        this.theme = theme;
        this.scheme = scheme;
        this.name = name;
        this.emails = emails;
        this.phoneNumbers = phoneNumbers;
        this.attachments = attachments;
        this.title = title;
        this.company = company;
        this.birthday = birthday;
        this.address = address;
        this.notes = notes;
        this.tags = tags;
        this.orgId = orgId;
        this.firstTime = firstTime;
        this.staffId = staffId;
        this.staff = staff;
        this.projectId = projectId;
        this.activeOrg = activeOrg;
        this.developer = developer;
        this.superAdmin = superAdmin;
        this.systemAdmin = systemAdmin;
        this.csvAudit = csvAudit;
        this.csvUser = csvUser;
        this.csvTester = csvTester;
        this.csvAdmin = csvAdmin;
        this.axiomaimUser = axiomaimUser;
        this.axiomaimAdmin = axiomaimAdmin;                    
        this.siteAdmin = siteAdmin;
        this.covidNotify = covidNotify;
        this.covidNurse = covidNurse;
        this.userName = userName;
        this.emailSignature = emailSignature;
        this.linkedIn = linkedIn;
        this.token = token;
        this.web_token = web_token;
        this.tokenDate = tokenDate;
        this.status = status;
        this.platform = platform;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;        

    }
    public id: string;
    public domain: string;
    public avatar?: string;
    public avatarUrl?: string;
    public avatarPath?: string;
    public avatarFile?: string;
    public avatarType?: string;
    public background?: string;
    public theme?: Theme;
    public scheme?: Scheme;
    public name?: string;
    public emails?: Email[];
    public phoneNumbers?: PhoneNumber[];
    public attachments?: Attachment;
    public title?: string;
    public company?: string;
    public birthday?: string | null;
    public address?: string | null;
    public notes?: string | null;
    public tags: string[];
    public orgId?: string;
    public firstTime?: boolean;
    public staffId?: number;
    public staff?: boolean;
    public projectId?: string;
    public activeOrg?: boolean;
    public developer?: boolean;
    public superAdmin?: boolean;
    public systemAdmin?: boolean;
    public csvAudit?: boolean;
    public csvUser?: boolean;
    public csvTester?: boolean;
    public csvAdmin?: boolean;
    public axiomaimUser?: boolean;
    public axiomaimAdmin?: boolean;
    public siteAdmin?: boolean;
    public covidNotify?: boolean;
    public covidNurse?: boolean;
    public userName?: string;
    public emailSignature?: string;
    public imageUrl?: string;
    public linkedIn?: string;
    public token?: string;
    public web_token?: string;
    public tokenDate?: string;
    public status?: string;
    public platform?: string;
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static emptyDto(): Organization {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            domain: null,
            avatar: 'images/logo/logo.png',
            avatarUrl: 'images/logo/logo.png',
            avatarPath: null,
            avatarFile: 'logo.png',
            avatarType: 'png',            
            background: 'images/cards/axiomaim-card.jpg',
            theme: null,
            scheme: null,
            name: 'CompanyName',
            emails: [],
            phoneNumbers: [],
            attachments: {},
            title: 'Title',
            company: null,
            birthday: null,
            address: null,
            notes: null,
            tags: [],
            orgId: null,
            firstTime: false,
            staffId: null,
            staff: false,
            projectId: null,
            activeOrg: false,
            developer: false,
            superAdmin: false,
            systemAdmin: false,
            csvAudit: false,
            csvUser: false,
            csvTester: false,
            csvAdmin: false,
            axiomaimUser: false,
            axiomaimAdmin: false,
            siteAdmin: false,
            covidNotify: false,
            covidNurse: false,
            userName: null,
            emailSignature: null,
            imageUrl: null,
            linkedIn: null,
            token: null,
            web_token: null,
            tokenDate: null,
            status: null,
            platform: null,
            createdAt: date,
            updatedAt: date,
            deletedAt: null
        }
    }

    public static emptyEmailDto(): Email {
        let date: any = new Date().toISOString();
        return {
            email: null,
            label: null,
        }
    }

    public static emptyPhoneNumberDto(): PhoneNumber {
        let date: any = new Date().toISOString();
        return {
            country: null,
            phoneNumber: null,
            label: null
        }
    }

    public static toDto(dto: Organization): Organization {
        let date: any = new Date().toISOString();
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                domain: dto.domain ? dto.domain : null,
                avatar: dto.avatar ? dto.avatar : 'images/logo/logo.png',
                avatarUrl: dto.avatarUrl ? dto.avatarUrl : 'images/logo/logo.png',
                avatarPath: dto.avatarPath ? dto.avatarPath : null,
                avatarFile: dto.avatarFile ? dto.avatarFile : 'logo.png',
                avatarType: dto.avatarType ? dto.avatarType : 'png',
                background: dto.background ? dto.background : 'images/cards/axiomaim-card.jpg',
                theme: dto.theme ? dto.theme : null,
                scheme: dto.scheme ? dto.scheme : null,
                name: dto.name ? dto.name : 'CompanyName',
                emails: dto.emails ? dto.emails : [],
                phoneNumbers: dto.phoneNumbers ? dto.phoneNumbers : [],
                attachments: dto.attachments ? dto.attachments : {},
                title: dto.title ? dto.title : null,
                company: dto.company ? dto.company : null,
                birthday: dto.birthday ? dto.birthday : null,
                address: dto.address ? dto.address : null,
                notes: dto.notes ? dto.notes : null,
                tags: dto.tags ? dto.tags : [],
                orgId: dto.orgId ? dto.orgId : null,
                firstTime: dto.firstTime ? dto.firstTime : false,
                staffId: dto.staffId ? dto.staffId : null,
                staff: dto.staff ? dto.staff : false,
                projectId: dto.projectId ? dto.projectId : null,
                activeOrg: dto.activeOrg ? dto.activeOrg : false,
                developer: dto.developer ? dto.developer : false,
                superAdmin: dto.superAdmin ? dto.superAdmin : false,
                systemAdmin: dto.systemAdmin ? dto.systemAdmin : false,
                csvAudit: dto.csvAudit ? dto.csvAudit : false,
                csvUser: dto.csvUser ? dto.csvUser : false,
                csvTester: dto.csvTester ? dto.csvTester : false,
                csvAdmin: dto.csvAdmin ? dto.csvAdmin : false,
                axiomaimUser: dto.axiomaimUser ? dto.axiomaimUser : false,
                axiomaimAdmin: dto.axiomaimAdmin ? dto.axiomaimAdmin : false,
                siteAdmin: dto.siteAdmin ? dto.siteAdmin : false,
                covidNotify: dto.covidNotify ? dto.covidNotify : false,
                covidNurse: dto.covidNurse ? dto.covidNurse : false,
                userName: dto.userName ? dto.userName : null,
                emailSignature: dto.emailSignature ? dto.emailSignature : null,
                linkedIn: dto.linkedIn ? dto.linkedIn : null,
                token: dto.token ? dto.token : null,
                web_token: dto.web_token ? dto.web_token : null,
                tokenDate: dto.tokenDate ? dto.tokenDate : null,
                status: dto.status ? dto.status : null,
                platform: dto.platform ? dto.platform : null,
                createdAt: dto.createdAt ? dto.createdAt : date,
                updatedAt: dto.updatedAt ? dto.updatedAt : date,
                deletedAt: dto.deletedAt ? dto.deletedAt : null
            };
        }    
}


export interface Organization {
    id: string;
    domain: string;
    avatar?: string;
    avatarUrl?: string;
    avatarPath?: string;
    avatarFile?: string;
    avatarType?: string;
    background?: string;
    theme?: Theme;
    scheme?: Scheme;        
    name?: string;
    emails?: Email[];
    phoneNumbers?: PhoneNumber[];
    attachments?: Attachment;
    title?: string;
    company?: string;
    birthday?: string | null;
    address?: string | null;
    notes?: string | null;
    tags?: string[];
    orgId?: string;
    firstTime?: boolean;
    staffId?: number; 
    staff?: boolean; 
    commitee?: string; 
    projectId?: string;
    activeOrg?: boolean;
    developer?: boolean;        
    superAdmin?: boolean;
    systemAdmin?: boolean;
    csvAudit?: boolean;
    csvUser?: boolean;
    csvTester?: boolean;
    csvAdmin?: boolean;
    axiomaimUser?: boolean;
    axiomaimAdmin?: boolean;
    siteAdmin?: boolean;
    covidNotify?: boolean;
    covidNurse?: boolean;
    fullName?: string;
    userName?: string;
    signatureName?: string;
    signatureRole?: string;
    signaturePassword?: string;
    firstName?: string;
    lastName?: string;
    description?: string;
    suffixName?: string;
    emailSignature?: string;
    imageUrl?: string;
    linkedIn?: string;
    mobileCountry?: string;
    mobileNo?: string;
    officeNo?: string;
    token?: string;
    web_token?: string;
    tokenDate?: string;
    fcm?: boolean;
    status?: string;
    platform?: string;
    model?: string;
    uuid?: string;
    country?: string;
    selected?: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;

}

export interface Detail {
    emails?: Email[];
    phoneNumbers?: PhoneNumber[];
    title?: string;
    company?: string;
    birthday?: string;
    address?: string;

}


export interface PhoneNumber {
    phoneNumber: string;
    label: string;
    country?: string;
}

export interface Email {
        email: string;
        label: string;
}

export interface Attachment {
    media?: any[];
    docs?: any[];
    links?: any[];
}

export interface Country {
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}






