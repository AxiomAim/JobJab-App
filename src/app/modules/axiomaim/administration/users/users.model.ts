import { Scheme, Theme } from '@axiomaim/services/config';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '../user-roles/user-roles.model';
import { BaseDto } from 'app/core/models/base-dto.model';
import * as v from 'valibot';
import { Organization } from '../organizations/organizations.model';


export class UserModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        organization: Organization,
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
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        ) {
            this.id = id;
            this.orgId = orgId;
            this.organization = organization;
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
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.deletedAt = deletedAt;
    }
    public id: string;
    public orgId: string;
    public organization: Organization;
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
    public createdAt?: string;
    public updatedAt?: string;
    public deletedAt?: string;

    public static toDto(dto: User): User {
        let date: any = new Date().toISOString();

        return {
            id: dto.id ? dto.id : '',
            orgId: dto.orgId ? dto.orgId : '',
            organization: dto.organization ? dto.organization : null,
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
            createdAt: dto.createdAt ? dto.createdAt : '',
            updatedAt: dto.updatedAt ? dto.updatedAt : '',
            deletedAt: dto.deletedAt ? dto.deletedAt : '',
        };
    }

    public static emptyDto(): User {
        let date: any = new Date().toISOString();
        return {
            id: uuidv4().toString(),
            orgId: '',
            organization: null,
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
            createdAt: date,
            updatedAt: date,
            deletedAt: '',

        }
    }
}

export interface User  extends BaseDto {
    id: string;
    orgId: string;
    organization: Organization; 
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
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;    
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

