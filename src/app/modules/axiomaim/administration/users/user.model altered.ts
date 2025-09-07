import { Scheme, Theme } from '@davesa/services/config';
import { BaseDto } from 'app/core/models/base-dto.model';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '../user-roles/user-role.model';

const avatar = {
    id: uuidv4().toString(),
    sort: 1,
    name: 'logo',
    description: '',
    imageUrl: 'assets/images/profile-placeholder.png'
}


export class UserModel implements BaseDto {
    constructor(
        id: string,
        orgId: string,
        domain: string,
        firstTime: boolean,
        staffId: number, 
        staff: boolean, 
        commitee: string, 
        projectId: string,
        activeUser: boolean,
        email: string,
        emailKey: string,
        personalEmail: string,
        userName: string,
        displayName: string,
        userRoles: UserRole[],
        signatureName: string,
        signatureRole: string,
        signaturePassword: string,
        signatureUrl: string,
        signaturePath: string,
        signatureFile: string,
        signatureType: string,
        firstName: string,
        lastName: string,
        description: string,
        address: string,
        emailSignature: string,
        avatar: string,
        avatarUrl: string,
        avatarPath: string,
        avatarFile: string,
        avatarType: string,
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
        platform?: string,
        model?: string,
        selected?: boolean,
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
            this.staffId = staffId;
            this.staff = staff;
            this.commitee = commitee;
            this.projectId = projectId;
            this.activeUser = activeUser;
            this.userName = userName;
            this.displayName = displayName;
            this.userRoles = userRoles;
            this.signatureName = signatureName;
            this.signatureRole = signatureRole;
            this.signaturePassword = signaturePassword;
            this.signatureUrl = signatureUrl;
            this.signaturePath = signaturePath;
            this.signatureFile = signatureFile;
            this.signatureType = signatureType;            
            this.firstName = firstName;
            this.lastName = lastName;
            this.description = description;
            this.address = address;
            this.emailSignature = emailSignature;
            this.email = email;
            this.emailKey = emailKey;
            this.personalEmail = personalEmail;
            this.avatar = avatar;
            this.avatarUrl = avatarUrl;
            this.avatarPath = avatarPath;
            this.avatarFile = avatarFile;
            this.avatarType = avatarType;
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
            this.platform = platform;
            this.model = model;
            this.selected = selected;
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
    public commitee: string;
    public projectId: string;
    public activeUser: boolean;
    public userName: string;
    public displayName: string;
    public userRoles: UserRole[];
    public signatureName: string;
    public signatureRole: string;
    public signaturePassword: string;
    public signatureUrl: string;
    public signaturePath: string;
    public signatureFile: string;
    public signatureType: string;
    public firstName: string;
    public lastName: string;
    public description: string;
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
    public model?: string;
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
            staffId: dto.staffId ? dto.staffId : 1,
            staff: dto.staff ? dto.staff : false,
            commitee: dto.commitee ? dto.commitee : '',
            projectId: dto.projectId ? dto.projectId : '',
            activeUser: dto.activeUser ? dto.activeUser : false,
            userName: dto.userName ? dto.userName : '',
            displayName: dto.displayName ? dto.displayName : '',
            userRoles: dto.userRoles ? dto.userRoles : [],
            signatureName: dto.signatureName ? dto.signatureName : '',
            signatureRole: dto.signatureRole ? dto.signatureRole : '',
            signaturePassword: dto.signaturePassword ? dto.signaturePassword : '',
            signatureUrl: dto.signatureUrl ? dto.signatureUrl : '', 
            signaturePath: dto.signaturePath ? dto.signaturePath : '',
            signatureFile: dto.signatureFile ? dto.signatureFile : '',
            signatureType: dto.signatureType ? dto.signatureType : '',
            firstName: dto.firstName ? dto.firstName : '',            
            lastName: dto.lastName ? dto.lastName : '',
            description: dto.description ? dto.description : '',
            address: dto.address ? dto.address : '',
            emailSignature: dto.emailSignature ? dto.emailSignature : '',
            email: dto.email ? dto.email : '',
            emailKey: dto.emailKey ? dto.emailKey : '',
            personalEmail: dto.personalEmail ? dto.personalEmail : '',
            avatar: dto.avatar ? dto.avatar : '',
            avatarUrl: dto.avatarUrl ? dto.avatarUrl : '',
            avatarPath: dto.avatarPath ? dto.avatarPath : '',
            avatarFile: dto.avatarFile ? dto.avatarFile : '',
            avatarType: dto.avatarType ? dto.avatarType : '',
            background: dto.background ? dto.background : 'images/cards/davesa-card.jpg',
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
            model: dto.model ? dto.model : '',
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
            staffId: 1,
            staff: false,
            commitee: '',
            projectId: '',
            activeUser: false,
            userName: '',
            displayName: '',
            userRoles: [],
            signatureName: '',
            signatureRole: '',
            signaturePassword: '',
            signatureUrl: '',
            signaturePath: '',
            signatureFile: '',
            signatureType: '',
            firstName: '',
            lastName: '',
            description: '',
            address: '',
            emailSignature: '',
            email: '',
            emailKey: '',
            personalEmail: '',
            avatar: '',
            avatarUrl: '',
            avatarPath: '',
            avatarFile: '',
            avatarType: '',
            background: 'images/cards/davesa-card.jpg',
            linkedIn: '',
            phoneNumbers: [],
            mobileCountry: '',
            mobileNo: '',
            officeNo: '',
            token: '',
            web_token: '',
            tokenDate: '',
            status: '',
            theme: null,
            scheme: null,
            platform: '',
            model: '',
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
    staffId: number;
    staff: boolean;
    commitee: string;
    projectId: string;
    activeUser: boolean;
    email: string;
    emailKey: string;
    personalEmail: string;
    userName: string;
    displayName: string;
    userRoles: UserRole[],
    signatureName: string;
    signatureRole: string;
    signaturePassword: string;
    signatureUrl: string;
    signaturePath: string;
    signatureFile: string;
    signatureType: string;
    firstName: string;
    lastName: string;
    description: string;
    address: string;
    emailSignature: string;
    avatar: string;
    avatarUrl: string;
    avatarPath: string;
    avatarFile: string;
    avatarType: string;
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
    model?: string;
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


