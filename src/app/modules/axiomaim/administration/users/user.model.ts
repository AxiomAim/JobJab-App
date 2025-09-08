import { Scheme, Theme } from '@axiomaim/services/config';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '../user-roles/user-role.model';
import { BaseDto } from 'app/core/models/base-dto.model';
import * as v from 'valibot';


export class UserModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        domain: string,
        firstTime: boolean,
        staff: boolean, 
        activeUser: boolean,
        email: string,
        emailKey: string,
        personalEmail: string,
        displayName: string,
        userRoles: UserRole[],
        title: string,
        firstName: string,
        lastName: string,
        company: string,
        agreements: boolean,
        address: string,
        emailSignature: string,
        avatar: string,
        background: string,
        linkedIn: string,
        phoneNumbers: PhoneNumber[],
        mobileCountry?: string,
        mobileNo?: string,
        officeNo?: string,
        token?: string,
        web_token?: string,
        tokenDate?: string,
        status?: string,
        theme?: Theme,
        scheme?: Scheme,
        login_at?: string[],
        login_info?: any[],
        created_at?: string,
        updated_at?: string,
        deleted_at?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.domain = domain;
            this.firstTime = firstTime;
            this.staff = staff;
            this.activeUser = activeUser;
            this.displayName = displayName;
            this.userRoles = userRoles;
            this.title = title;
            this.firstName = firstName;
            this.lastName = lastName;
            this.company = company;
            this.agreements = agreements;
            this.address = address;
            this.emailSignature = emailSignature;
            this.email = email;
            this.emailKey = emailKey;
            this.personalEmail = personalEmail;
            this.avatar = avatar;
            this.background = background;    
            this.linkedIn = linkedIn;
            this.phoneNumbers = phoneNumbers;
            this.mobileCountry = mobileCountry;
            this.mobileNo = mobileNo;
            this.officeNo = officeNo;
            this.token = token;
            this.web_token = web_token;
            this.tokenDate = tokenDate;
            this.status = status;
            this.theme = theme;
            this.scheme = scheme;    
            this.login_at = login_at;
            this.login_info = login_info;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.deleted_at = deleted_at;
    }
    public id: string;
    public orgId: string;
    public domain: string;
    public firstTime: boolean;
    public staffId: number;
    public staff: boolean;
    public projectId: string;
    public activeUser: boolean;
    public userName: string;
    public displayName: string;
    public userRoles: UserRole[];
    public title: string;
    public signatureName: string;
    public signatureRole: string;
    public signaturePassword: string;
    public signatureUrl: string;
    public signaturePath: string;
    public signatureFile: string;
    public signatureType: string;
    public firstName: string;
    public lastName: string;
    public company: string;
    public agreements: boolean;
    public address: string;
    public emailSignature: string;
    public email: string;
    public emailKey: string;
    public personalEmail: string;
    public avatar: string;
    public avatarUrl: string;
    public avatarPath: string;
    public avatarFile: string;
    public avatarType: string;
    public background: string;
    public linkedIn: string;
    public phoneNumbers: PhoneNumber[];
    public thumb?: string;
    public mobileCountry?: string;
    public mobileNo?: string;
    public officeNo?: string;
    public token?: string;
    public web_token?: string;
    public tokenDate?: string;
    public status?: string;
    public theme?: Theme;
    public scheme?: Scheme;
    public platform?: string;
    public selected?: boolean;
    public login_at?: string[];
    public login_info?: any[];
    public created_at?: string;
    public updated_at?: string;
    public deleted_at?: string;

    public static toDto(dto: User): User {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            domain: dto.domain ? dto.domain : '',
            firstTime: dto.firstTime ? dto.firstTime : true,
            staff: dto.staff ? dto.staff : false,
            activeUser: dto.activeUser ? dto.activeUser : false,
            displayName: dto.displayName ? dto.displayName : '',
            userRoles: dto.userRoles ? dto.userRoles : [],
            title: dto.title ? dto.title : '',
            firstName: dto.firstName ? dto.firstName : '',            
            lastName: dto.lastName ? dto.lastName : '',
            company: dto.company ? dto.company : '',
            agreements: dto.agreements ? dto.agreements : false,
            address: dto.address ? dto.address : '',
            emailSignature: dto.emailSignature ? dto.emailSignature : '',
            email: dto.email ? dto.email : '',
            emailKey: dto.emailKey ? dto.emailKey : '',
            personalEmail: dto.personalEmail ? dto.personalEmail : '',
            avatar: dto.avatar ? dto.avatar : '',
            background: dto.background ? dto.background : 'images/cards/axiomaim-card.jpg',
            linkedIn: dto.linkedIn ? dto.linkedIn : '',
            phoneNumbers: dto.phoneNumbers ? dto.phoneNumbers : [],
            mobileCountry: dto.mobileCountry ? dto.mobileCountry : '',
            mobileNo: dto.mobileNo ? dto.mobileNo : '',
            officeNo: dto.officeNo ? dto.officeNo : '',
            token: dto.token ? dto.token : '',
            web_token: dto.web_token ? dto.web_token : '',
            tokenDate: dto.tokenDate ? dto.tokenDate : '',
            status: dto.status ? dto.status : '',
            theme: dto.theme ? dto.theme : null,
            scheme: dto.scheme ? dto.scheme : null,
            platform: dto.platform ? dto.platform : '',
            selected: dto.selected ? dto.selected : false,
            login_at: dto.login_at ? dto.login_at : [],
            login_info: dto.login_info ? dto.login_info : [],
            created_at: dto.created_at ? dto.created_at : '',
            updated_at: dto.updated_at ? dto.updated_at : '',
            deleted_at: dto.deleted_at ? dto.deleted_at : '',
        };
    }

    public static emptyDto(): User {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            domain: '',
            firstTime: true,
            staff: false,
            activeUser: false,
            displayName: '',
            userRoles: [],
            title: '',
            firstName: '',
            lastName: '',
            company: '',
            agreements: false,
            address: '',
            emailSignature: '',
            email: '',
            emailKey: '',
            personalEmail: '',
            avatar: '',
            background: 'images/cards/33-640x480.jpg',
            linkedIn: '',
            phoneNumbers: [],
            mobileCountry: '',
            mobileNo: '',
            officeNo: '',
            token: '',
            web_token: '',
            tokenDate: '',
            status: '',
            theme: 'theme-default',
            scheme: 'light',
            platform: '',
            selected: false,
            login_at: [],
            login_info: [],
            created_at: date,
            updated_at: date,
            deleted_at: '',

        }
    }
}

export interface User  extends BaseDto {
    id: string;
    orgId: string,
    domain: string;
    firstTime: boolean;
    staff: boolean;
    activeUser: boolean;
    email: string;
    emailKey: string;
    personalEmail: string;
    displayName: string;
    userRoles: UserRole[],
    title: string;
    firstName: string;
    lastName: string;
    company: string;
    agreements: boolean;
    address: string;
    emailSignature: string;
    avatar: string;
    background: string;
    linkedIn: string;
    phoneNumbers: PhoneNumber[];
    mobileCountry?: string;
    mobileNo?: string;
    officeNo?: string;
    token?: string;
    web_token?: string;
    tokenDate?: string;
    status?: string;
    theme?: Theme;
    scheme?: Scheme;
    platform?: string;
    selected?: boolean;
    login_at?: string[];
    login_info?: any[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;    
}

export interface Permissions {
    create: boolean;
    read: boolean;
    update: boolean;
}

export interface PhoneNumber {
    phoneNumber: string;
    label: string;
    country?: string;
}

export interface Country {
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

const PhoneNumberSchema = v.object({
    phoneNumber: v.pipe(v.string()),
    label: v.pipe(v.string()),
    country: v.pipe(v.string()),
});

const UserSchema = v.object({
        orgId: v.pipe(v.string()),
        domain: v.pipe(v.string()),
        firstTime: v.pipe(v.boolean()),
        staffId: v.pipe(v.number()),
        staff: v.pipe(v.boolean()),
        projectId: v.pipe(v.string()),
        activeUser: v.pipe(v.boolean()),
        email: v.pipe(v.string(), v.email()),
        emailKey: v.pipe(v.string()),
        personalEmail: v.pipe(v.string()),
        userName: v.pipe(v.string()),
        displayName: v.pipe(v.string()),
        title: v.pipe(v.string()),
        signatureName: v.pipe(v.string()),
        signatureRole: v.pipe(v.string()),
        signaturePassword: v.pipe(v.string()),
        signatureUrl: v.pipe(v.string()),
        signaturePath: v.pipe(v.string()),
        signatureFile: v.pipe(v.string()),
        signatureType: v.pipe(v.string()),
        firstName: v.pipe(v.string()),
        lastName: v.pipe(v.string()),
        company: v.pipe(v.string()),
        agreements: v.pipe(v.boolean()),
        address: v.pipe(v.string()),
        emailSignature: v.pipe(v.string()),
        avatar: v.pipe(v.string()),
        avatarUrl: v.pipe(v.string()),
        avatarPath: v.pipe(v.string()),
        avatarFile: v.pipe(v.string()),
        avatarType: v.pipe(v.string()),
        background: v.pipe(v.string()),
        linkedIn: v.pipe(v.string()),
        phoneNumbers: v.pipe(PhoneNumberSchema),
        mobileCountry: v.pipe(v.string()),
        mobileNo: v.pipe(v.string()),
        officeNo: v.pipe(v.string()),
        token: v.pipe(v.string()),
        web_token: v.pipe(v.string()),
        tokenDate: v.pipe(v.string()),
        status: v.pipe(v.string()),
        platform: v.pipe(v.string()),
        selected: v.pipe(v.boolean()),
        login_at: v.pipe(v.string()),
        login_info: v.pipe(v.any()),
        created_at: v.pipe(v.string()),
        updated_at: v.pipe(v.string()),
        deleted_at: v.pipe(v.string()),    
});

const CountrySchema = v.object({
    id: v.pipe(v.string()),
    iso: v.pipe(v.string()),
    name: v.pipe(v.string()),
    code: v.pipe(v.string()),
    flagImagePos: v.pipe(v.string()),
});

