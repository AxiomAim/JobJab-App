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
        orgId?: string,
        domain?: string,
        email?: string,
        displayName?: string,
        password?: string,
        photoUrl?: string,
        firstTime?: boolean,
        staffId?: number,
        staff?: boolean,
        commitee?: string,
        projectId?: string,
        activeUser?: boolean,
        developer?: boolean,
        superAdmin?: boolean,
        systemAdmin?: boolean,
        csvAudit?: boolean,
        csvUser?: boolean,
        csvTester?: boolean,
        csvAdmin?: boolean,
        davesaUser?: boolean,
        davesaAdmin?: boolean,
        siteAdmin?: boolean,
        covidNotify?: boolean,
        covidNurse?: boolean,
        emailKey?: string,
        personalEmail?: string,
        fullName?: string,
        userName?: string,
        userRoles?: UserRole[],
        name?: string,
        signatureName?: string,
        signatureRole?: string,
        signaturePassword?: string,
        title?: string,
        firstName?: string,
        lastName?: string,
        description?: string,
        suffixName?: string,
        address?: string,
        emailSignature?: string,
        avatar?: string,
        avatarUrl?: string,
        avatarPath?: string,
        avatarFile?: string,
        avatarType?: string,
        background?: string,
        imageUrl?: string,
        linkedIn?: string,
        phoneNumbers?: PhoneNumber[],
        mobileCountry?: string,
        mobileNo?: string,
        officeNo?: string,
        token?: string,
        web_token?: string,
        tokenDate?: string,
        fcm?: boolean,
        status?: string,
        theme?: Theme,
        scheme?: Scheme,
        platform?: string,
        model?: string,
        uuid?: string,
        country?: string,
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
            this.email = email;
            this.displayName = displayName;
            this.password = password;
            this.photoUrl = photoUrl;
            this.firstTime = firstTime;
            this.staffId = staffId;
            this.staff = staff;
            this.commitee = commitee;
            this.projectId = projectId;
            this.activeUser = activeUser;
            this.developer = developer;
            this.superAdmin = superAdmin;
            this.csvAudit = csvAudit;
            this.csvUser = csvUser;
            this.csvTester = csvTester;
            this.csvAdmin = csvAdmin;
            this.davesaUser = davesaUser;
            this.davesaAdmin = davesaAdmin;
            this.systemAdmin = systemAdmin;
            this.siteAdmin = siteAdmin;
            this.covidNotify = covidNotify;
            this.covidNurse = covidNurse;
            this.fullName = fullName;
            this.userName = userName;
            this.userRoles = userRoles;
            this.name = name;
            this.signatureName = signatureName;
            this.signatureRole = signatureRole;
            this.signaturePassword = signaturePassword;
            this.title = title;
            this.firstName = firstName;
            this.lastName = lastName;
            this.description = description;
            this.suffixName = suffixName;
            this.address = address;
            this.emailSignature = emailSignature;
            this.emailKey = emailKey;
            this.personalEmail = personalEmail;
            this.avatar = avatar;
            this.avatarUrl = avatarUrl;
            this.avatarPath = avatarPath;
            this.avatarFile = avatarFile;
            this.avatarType = avatarType;
            this.background = background;    
            this.imageUrl = imageUrl;
            this.linkedIn = linkedIn;
            this.phoneNumbers = phoneNumbers;
            this.mobileCountry = mobileCountry;
            this.mobileNo = mobileNo;
            this.officeNo = officeNo;
            this.token = token;
            this.web_token = web_token;
            this.tokenDate = tokenDate;
            this.fcm = fcm;
            this.status = status;
            this.theme = theme;
            this.scheme = scheme;    
            this.platform = platform;
            this.model = model;
            this.uuid = uuid;
            this.country = country;
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
    public email: string;
    public displayName: string;
    public password: string;
    public photoUrl: string;
    public firstTime: boolean;
    public staffId: number;
    public staff: boolean;
    public commitee: string;
    public projectId: string;
    public activeUser: boolean;
    public developer: boolean;
    public superAdmin: boolean;
    public systemAdmin: boolean;
    public csvAudit: boolean;
    public csvUser: boolean;
    public csvTester: boolean;
    public csvAdmin: boolean;
    public davesaUser: boolean;
    public davesaAdmin: boolean;
    public siteAdmin: boolean;
    public covidNotify: boolean;
    public covidNurse: boolean;
    public fullName: string;
    public userName: string;
    public userRoles: UserRole[];
    public name: string;
    public signatureName: string;
    public signatureRole: string;
    public signaturePassword: string;
    public title: string;
    public firstName: string;
    public lastName: string;
    public description: string;
    public suffixName: string;
    public address: string;
    public emailSignature: string;
    public emailKey: string;
    public personalEmail: string;
    public avatar: string;
    public avatarUrl: string;
    public avatarPath: string;
    public avatarFile: string;
    public avatarType: string;
    public background: string;
    public imageUrl: string;
    public linkedIn: string;
    public phoneNumbers: PhoneNumber[];
    public thumb?: string;
    public mobileCountry?: string;
    public mobileNo?: string;
    public officeNo?: string;
    public token?: string;
    public web_token?: string;
    public tokenDate?: string;
    public fcm?: boolean;
    public status?: string;
    public theme?: Theme;
    public scheme?: Scheme;
    public platform?: string;
    public model?: string;
    public uuid?: string;
    public country?: string;
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
            email: dto.email ? dto.email : '',
            displayName: dto.displayName ? dto.displayName : '',
            password: dto.password ? dto.password : '',
            photoUrl: dto.photoUrl ? dto.photoUrl : '',
            firstTime: dto.firstTime ? dto.firstTime : true,
            staffId: dto.staffId ? dto.staffId : 1,
            staff: dto.staff ? dto.staff : false,
            commitee: dto.commitee ? dto.commitee : '',
            projectId: dto.projectId ? dto.projectId : '',
            activeUser: dto.activeUser ? dto.activeUser : false,
            developer: dto.developer ? dto.developer : false,
            superAdmin: dto.superAdmin ? dto.superAdmin : false,
            csvAudit: dto.csvAudit ? dto.csvAudit : false,
            csvUser: dto.csvUser ? dto.csvUser : false,
            csvTester: dto.csvTester ? dto.csvTester : false,
            csvAdmin: dto.csvAdmin ? dto.csvAdmin : false,
            davesaUser: dto.davesaUser ? dto.davesaUser : false,
            davesaAdmin: dto.davesaAdmin ? dto.davesaAdmin : false,
            systemAdmin: dto.systemAdmin ? dto.systemAdmin : false,
            siteAdmin: dto.siteAdmin ? dto.siteAdmin : false,
            covidNotify: dto.covidNotify ? dto.covidNotify : false,
            covidNurse: dto.covidNurse ? dto.covidNurse : false,
            fullName: dto.fullName ? dto.fullName : '',
            userName: dto.userName ? dto.userName : '',
            userRoles: dto.userRoles ? dto.userRoles : [],
            name: dto.name ? dto.name : '',
            signatureName: dto.signatureName ? dto.signatureName : '',
            signatureRole: dto.signatureRole ? dto.signatureRole : '',
            signaturePassword: dto.signaturePassword ? dto.signaturePassword : '',
            title: dto.title ? dto.title : '',
            firstName: dto.firstName ? dto.firstName : '',            
            lastName: dto.lastName ? dto.lastName : '',
            description: dto.description ? dto.description : '',
            suffixName: dto.suffixName ? dto.suffixName : '',
            address: dto.address ? dto.address : '',
            emailSignature: dto.emailSignature ? dto.emailSignature : '',
            emailKey: dto.emailKey ? dto.emailKey : '',
            personalEmail: dto.personalEmail ? dto.personalEmail : '',
            avatar: dto.avatar ? dto.avatar : '',
            avatarUrl: dto.avatarUrl ? dto.avatarUrl : '',
            avatarPath: dto.avatarPath ? dto.avatarPath : '',
            avatarFile: dto.avatarFile ? dto.avatarFile : '',
            avatarType: dto.avatarType ? dto.avatarType : '',
            background: dto.background ? dto.background : 'images/cards/davesa-card.jpg',
            imageUrl: dto.imageUrl ? dto.imageUrl : '',
            linkedIn: dto.linkedIn ? dto.linkedIn : '',
            phoneNumbers: dto.phoneNumbers ? dto.phoneNumbers : [],
            mobileCountry: dto.mobileCountry ? dto.mobileCountry : '',
            mobileNo: dto.mobileNo ? dto.mobileNo : '',
            officeNo: dto.officeNo ? dto.officeNo : '',
            token: dto.token ? dto.token : '',
            web_token: dto.web_token ? dto.web_token : '',
            tokenDate: dto.tokenDate ? dto.tokenDate : '',
            fcm: dto.fcm ? dto.fcm : false,
            status: dto.status ? dto.status : '',
            theme: dto.theme ? dto.theme : null,
            scheme: dto.scheme ? dto.scheme : null,
            platform: dto.platform ? dto.platform : '',
            model: dto.model ? dto.model : '',
            uuid: dto.uuid ? dto.uuid : '',
            country: dto.country ? dto.country : '',
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
            email: '',
            displayName: '',
            password: 'Davesa@123',
            photoUrl: '',
            firstTime: true,
            staffId: 1,
            staff: false,
            commitee: '',
            projectId: '',
            activeUser: false,
            developer: false,
            superAdmin: false,
            systemAdmin: false,
            csvAudit: false,
            csvUser: false,
            csvTester: false,
            csvAdmin: false,
            davesaUser: false,
            davesaAdmin: false,
            siteAdmin: false,
            covidNotify: false,
            covidNurse: false,
            fullName: '',
            userName: '',
            userRoles: [],
            name: '',
            signatureName: '',
            signatureRole: '',
            signaturePassword: '',
            title: '',
            firstName: '',
            lastName: '',
            description: '',
            suffixName: '',
            address: '',
            emailSignature: '',
            emailKey: '',
            personalEmail: '',
            avatar: '',
            avatarUrl: '',
            avatarPath: '',
            avatarFile: '',
            avatarType: '',
            background: 'images/cards/davesa-card.jpg',
            imageUrl: '',
            linkedIn: '',
            phoneNumbers: [],
            mobileCountry: '',
            mobileNo: '',
            officeNo: '',
            token: '',
            web_token: '',
            tokenDate: '',
            fcm: false,
            status: '',
            theme: null,
            scheme: null,
            platform: '',
            model: '',
            uuid: '',
            country: '',
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
    orgId?: string,
    domain?: string;
    email?: string;
    displayName?: string;
    password?: string;
    photoUrl?: string;
    firstTime?: boolean;
    staffId?: number;
    staff?: boolean;
    commitee?: string;
    projectId?: string;
    activeUser?: boolean;
    developer?: boolean;
    superAdmin?: boolean;
    systemAdmin?: boolean;
    csvAudit?: boolean;
    csvUser?: boolean;
    csvTester?: boolean;
    csvAdmin?: boolean;
    davesaUser?: boolean;
    davesaAdmin?: boolean;
    siteAdmin?: boolean;
    covidNotify?: boolean;
    covidNurse?: boolean;
    emailKey?: string;
    personalEmail?: string;
    fullName?: string;
    userName?: string;
    userRoles?: UserRole[],
    name?: string;
    signatureName?: string;
    signatureRole?: string;
    signaturePassword?: string;
    title?: string;
    firstName?: string;
    lastName?: string;
    description?: string;
    suffixName?: string;
    address?: string;
    emailSignature?: string;
    avatar?: string;
    avatarUrl?: string;
    avatarPath?: string;
    avatarFile?: string;
    avatarType?: string;
    background?: string;
    imageUrl?: string;
    linkedIn?: string;
    phoneNumbers?: PhoneNumber[];
    mobileCountry?: string;
    mobileNo?: string;
    officeNo?: string;
    token?: string;
    web_token?: string;
    tokenDate?: string;
    fcm?: boolean;
    status?: string;
    theme?: Theme;
    scheme?: Scheme;
    platform?: string;
    model?: string;
    uuid?: string;
    country?: string;
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


