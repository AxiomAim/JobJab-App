import { v4 as uuidv4 } from 'uuid';
import { BaseDto } from 'app/core/models/base-dto.model';
import { User } from '../../administration/users/users.model';

export class ProjectCardModel {
    constructor(
        id: string,
        aimId?: string,
        boardId?: string,
        listId?: string,
        user?: User,
        userId?: string,
        sort?: number,
        position?: number,
        title?: string,
        description?: string,
        priority?: any,
        type?: any,
        startAt?: string | null,
        dueDate?: string | null,
        testLog?: ProjectLog[],
        content?: string,
        tasks?: Task[],
        images?: Image[],
        imageName?: string | null,
        imagePath?: string | null,
        imageType?: string | null,
        imageUrl?: string | null,
        archived?: boolean,
        createdAt?: string,
        updatedAt?: string | null,
        log?: ProjectLog[],

        //Support Ticket Fields
        orgId?: string, 
        projectId?: string, 
        support_posts?: SupportTicketPostDto[],
        epic?: string, 
        invoiceId?: string,         
        backlog?: boolean,
        Id?: string, 
        sid?: number, 
        Status?: string,
        Summary?: string,
        Type?: string,
        buildType?: string,
        Priority?: string,
        version?: string,
        Tags?: any,
        Estimate?: number,
        bill_hours?: number,
        effective_hours?: number,
        bill_rate?: number,
        effective_rate?: number,
        Assignee?: string,
        RankId?: number,
        userName?: string,        
        userEmail?: string,        
        studyId?: string,
        Epics?: EpicDto,
        StartDate?: string,
        EndDate?: string,
        Duration?: number,
        Progress?: number,
        Predecessor?: number,
        Children?: any[],
        isManual?: boolean,
        name?: string,
        created_user?: string,
        created_userId?: string,
        createdAt?: string,
        updatedAt?: string,
        deletedAt?: string,
        open_at?: string,
        assign_userId?: string,
        assign_userName?: string,
        assign_userEmail?: string,
        closed?: boolean,
        closed_at?: string,
        closed_userId?: string,
        closed_userName?: string,
        notificationList?: User[],
        build?: boolean,
        buildVersion?: string,
        counter?: number,
    

                    ) {
        this.id = id;
        this.aimId = aimId;
        this.boardId = boardId;
        this.listId = listId;
        this.user = user;
        this.userId = userId;
        this.sort = sort;
        this.position = position;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.type = type;
        this.startAt = startAt;
        this.dueDate = dueDate;
        this.testLog = testLog;
        this.content = content;
        this.tasks = tasks;
        this.images = images;
        this.imageName = imageName;
        this.imagePath = imagePath;
        this.imageType = imageType;
        this.imageUrl = imageUrl;
        this.archived = archived;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.log = log;              
        
        //Support Ticket Fields
        this.orgId = orgId;
        this.projectId = projectId;
        this.support_posts = support_posts;
        this.epic = epic;
        this.invoiceId = invoiceId;
        this.backlog = backlog;
        this.Id = Id;
        this.sid = sid;
        this.Status = Status;
        this.Summary = Summary;
        this.Type = Type;
        this.buildType = buildType;
        this.Priority = Priority;
        this.version = version;
        this.Tags = Tags;
        this.Estimate = Estimate;
        this.bill_hours = bill_hours;
        this.effective_hours = effective_hours;
        this.bill_rate = bill_rate;
        this.effective_rate = effective_rate;
        this.Assignee = Assignee;
        this.RankId = RankId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.studyId = studyId;
        this.Epics = Epics;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.Duration = Duration;
        this.Progress = Progress;
        this.Predecessor = Predecessor;
        this.Children = Children;
        this.isManual = isManual;
        this.name = name;
        this.created_user = created_user;
        this.created_userId = created_userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.open_at = open_at;
        this.assign_userId = assign_userId;
        this.assign_userName = assign_userName;
        this.assign_userEmail = assign_userEmail;
        this.closed = closed;
        this.closed_at = closed_at;
        this.closed_userId = closed_userId;
        this.closed_userName = closed_userName;
        this.notificationList = notificationList;
        this.build = build;
        this.buildVersion = buildVersion;
        this.counter = counter;




    }

    public id: string;
    public aimId: string;
    public boardId: string;
    public listId: string;
    public user: User;
    public userId: string;
    public sort: number;
    public position: number;
    public title: string;
    public description: string;
    public priority: any;
    public type: any;
    public startAt: string | null;
    public dueDate: string | null;
    public testLog: ProjectLog[];
    public content?: string;
    public tasks?: Task[];
    public images?: Image[];
    public imageName?: string | null;
    public imagePath?: string | null;
    public imageType?: string | null;
    public imageUrl?: string | null;
    public archived?: boolean;
    public createdAt?: string;
    public updatedAt?: string | null;
    public log: ProjectLog[];
    //Support Ticket Fields
    public orgId: string;
    public projectId: string;
    public support_posts: SupportTicketPostDto[];
    public epic: string;
    public invoiceId: string;
    public backlog: boolean;
    public Id: string;
    public sid: number;
    public Status: string;
    public Summary: string;
    public Type: string;
    public buildType: string;
    public Priority: string;
    public version: string;
    public Tags: any;
    public Estimate: number;
    public bill_hours: number;
    public effective_hours: number;
    public bill_rate: number;
    public effective_rate: number;
    public Assignee: string;
    public RankId: number;
    public userName: string;
    public userEmail: string;
    public studyId: string;
    public Epics: EpicDto;
    public StartDate: string;
    public EndDate: string;
    public Duration: number;
    public Progress: number;
    public Predecessor: number;
    public Children: any[];
    public isManual: boolean;
    public name: string;
    public created_user: string;
    public created_userId: string;
    public createdAt: string;
    public updatedAt: string;
    public deletedAt: string;
    public open_at: string;
    public assign_userId: string;
    public assign_userName: string;
    public assign_userEmail: string;
    public closed: boolean;
    public closed_at: string;
    public closed_userId: string;
    public closed_userName: string;
    public notificationList: User[];
    public build: boolean;
    public buildVersion: string;
    public counter: number;



    public static emptyDto(): ProjectCard {
        let datetime: any = new Date().toISOString();

        return {
            id: uuidv4().toString(),
            aimId: '',
            boardId: '',
            listId: '',
            user: null,
            userId: '',
            sort: 1,
            position: 0,
            title: '',
            description: '',
            priority: null,
            type: null,
            startAt: null,
            dueDate: '',
            testLog: [],
            content: '',
            tasks: null,
            images: [],
            imageName: '',
            imagePath: '',
            imageType: '',
            imageUrl: '',
            archived: false,
            createdAt: datetime,
            updatedAt: null,
            log: [],

            //Support Ticket Fields
            orgId: '',
            projectId: '',
            support_posts: [],
            epic: '',
            invoiceId: '',
            backlog: false,
            Id: '',
            sid: 0,
            Status: '',
            Summary: '',
            Type: '',
            buildType: '',
            Priority: '',
            version: '',
            Tags: '',
            Estimate: 0,
            bill_hours: 0,
            effective_hours: 0,
            bill_rate: 0,
            effective_rate: 0,
            Assignee: '',
            RankId: 0,
            userName: '',
            userEmail: '',
            studyId: '',
            Epics: null,
            StartDate: '',
            EndDate: '',
            Duration: 0,
            Progress: 0,
            Predecessor: 0,
            Children: [],
            isManual: false,
            name: '',
            created_user: '',
            created_userId: '',
            createdAt: '',
            updatedAt: '',
            deletedAt: '',
            open_at: '',
            assign_userId: '',
            assign_userName: '',
            assign_userEmail: '',
            closed: false,
            closed_at: '',
            closed_userId: '',
            closed_userName: '',
            notificationList: [],
            build: false,
            buildVersion: '',
            counter: 0,


        }
    }

    public static emptyTaskDto(): Task {
        return {
            id: uuidv4().toString(),
            sort: 1,
            title: '',
            completed: '',
        }
    }

    public static testLogDto(): ProjectLog {

        let datetime: any = new Date().toISOString();

        return {
            id: uuidv4().toString(),
            sort: 1,
            boardId: '',
            cardId: '',
            listFrom: null,
            listTo: null,
            title: '',
            logAt: datetime,
            logBy: '',
            failed: false,
            passed: false,            
        }
    }

    public static ticketToCardDto(dto: ProjectCard): ProjectCard {
        let datetime: any = new Date().toISOString();
            return {
                id: dto.id ? dto.id : uuidv4().toString(),
                aimId: dto.aimId ? dto.aimId : '920847a3-b7e5-43b2-b39f-5c412d7610de',
                boardId: '8ab1c643-24f3-48f7-b65c-5905e6cdf4f2',
                listId: dto.Status === 'Close' ? 'f66ec422-aef8-45b7-8377-b3d15037c06d' : '445a8afa-64e7-4a4c-948d-be97fa6f29d2',
                user: dto.user ? dto.user : null,
                userId: dto.userId ? dto.userId : '',
                sort: dto.sort ? dto.sort : 1,
                position: dto.RankId ? dto.RankId : 0,
                title: dto.Summary,
                description: dto.description ? dto.description : '',
                priority: dto.Priority ? dto.Priority : dto.priority,
                type: dto.Type ? dto.Type : dto.type,
                startAt: dto.startAt ? dto.startAt : null,
                dueDate: dto.dueDate ? dto.dueDate : '',
                testLog: dto.testLog ? dto.testLog : [],
                content: dto.content ? dto.content : '',
                tasks: dto.tasks ? dto.tasks : [],
                images: dto.images ? dto.images : [],
                imageName: dto.imageName ? dto.imageName : null,
                imagePath: dto.imagePath ? dto.imagePath : null,
                imageType: dto.imageType ? dto.imageType : null,
                imageUrl: dto.imageUrl ? dto.imageUrl : null,
                archived: dto.archived ? dto.archived : false,
                createdAt: dto.createdAt ? dto.createdAt : datetime,
                updatedAt: dto.updatedAt ? dto.updatedAt :  null,
                log: dto.log ? dto.log : [],

                //Support Ticket Fields
                orgId: dto.orgId ? dto.orgId : '',
                projectId: dto.projectId ? dto.projectId : '',
                support_posts: dto.support_posts ? dto.support_posts : [],
                epic: dto.epic ? dto.epic : '',
                invoiceId: dto.invoiceId ? dto.invoiceId : '',
                backlog: dto.backlog ? dto.backlog : false,
                Id: dto.Id ? dto.Id : '',
                sid: dto.sid ? dto.sid : 0,
                Status: dto.Status ? dto.Status : '',
                Summary: dto.Summary ? dto.Summary : '',
                Type: dto.Type ? dto.Type : '',
                buildType: dto.buildType ? dto.buildType : '',
                Priority: dto.Priority ? dto.Priority : '',
                version: dto.version ? dto.version : '',
                Tags: dto.Tags ? dto.Tags : '',
                Estimate: dto.Estimate ? dto.Estimate : 0,
                bill_hours: dto.bill_hours ? dto.bill_hours : 0,
                effective_hours: dto.effective_hours ? dto.effective_hours : 0,
                bill_rate: dto.bill_rate ? dto.bill_rate : 0,
                effective_rate: dto.effective_rate ? dto.effective_rate : 0,
                Assignee: dto.Assignee ? dto.Assignee : '',
                RankId: dto.RankId ? dto.RankId : 0,
                userName: dto.userName ? dto.userName : '',
                userEmail: dto.userEmail ? dto.userEmail : '',
                studyId: dto.studyId ? dto.studyId : '',
                Epics: dto.Epics ? dto.Epics : null,
                StartDate: dto.StartDate ? dto.StartDate : '',
                EndDate: dto.EndDate ? dto.EndDate : '',
                Duration: dto.Duration ? dto.Duration : 0,
                Progress: dto.Progress ? dto.Progress : 0,
                Predecessor: dto.Predecessor ? dto.Predecessor : 0,
                Children: dto.Children ? dto.Children : [],
                isManual: dto.isManual ? dto.isManual : false,
                name: dto.name ? dto.name : '',
                created_user: dto.created_user ? dto.created_user : '',
                created_userId: dto.created_userId ? dto.created_userId : '',
                createdAt: dto.createdAt ? dto.createdAt : '',
                updatedAt: dto.updatedAt ? dto.updatedAt : '',
                deletedAt: dto.deletedAt ? dto.deletedAt : '',
                open_at: dto.open_at ? dto.open_at : '',
                assign_userId: dto.assign_userId ? dto.assign_userId : '',
                assign_userName: dto.assign_userName ? dto.assign_userName : '',
                assign_userEmail: dto.assign_userEmail ? dto.assign_userEmail : '',
                closed: dto.closed ? dto.closed : false,
                closed_at: dto.closed_at ? dto.closed_at : '',
                closed_userId: dto.closed_userId ? dto.closed_userId : '',
                closed_userName: dto.closed_userName ? dto.closed_userName : '',
                notificationList: dto.notificationList ? dto.notificationList : [],
                build: dto.build ? dto.build : false,
                buildVersion: dto.buildVersion ? dto.buildVersion : '',
                counter: dto.counter ? dto.counter : 0,


            };
        }    

        public static toDto(dto: ProjectCard): ProjectCard {
            let datetime: any = new Date().toISOString();
                return {
                    id: dto.id ? dto.id : uuidv4().toString(),
                    boardId: dto.boardId ? dto.boardId : '',
                    listId: dto.listId ? dto.listId : '',
                    user: dto.user ? dto.user : null,
                    userId: dto.userId ? dto.userId : '',
                    sort: dto.sort ? dto.sort : 1,
                    position: dto.position ? dto.position : 0,
                    title: dto.title ? dto.title : '',
                    description: dto.description ? dto.description : '',
                    priority: dto.priority ? dto.priority : null,
                    type: dto.type ? dto.type : null,
                    startAt: dto.startAt ? dto.startAt : null,
                    dueDate: dto.dueDate ? dto.dueDate : '',
                    testLog: dto.testLog ? dto.testLog : [],
                    content: dto.content ? dto.content : '',
                    tasks: dto.tasks ? dto.tasks : [],
                    images: dto.images ? dto.images : [],
                    imageName: dto.imageName ? dto.imageName : null,
                    imagePath: dto.imagePath ? dto.imagePath : null,
                    imageType: dto.imageType ? dto.imageType : null,
                    imageUrl: dto.imageUrl ? dto.imageUrl : null,
                    archived: dto.archived ? dto.archived : false,
                    createdAt: dto.createdAt ? dto.createdAt : datetime,
                    updatedAt: dto.updatedAt ? dto.updatedAt :  null,
                    log: dto.log ? dto.log : [],

                    //Support Ticket Fields
                    orgId: dto.orgId ? dto.orgId : '',
                    projectId: dto.projectId ? dto.projectId : '',
                    support_posts: dto.support_posts ? dto.support_posts : [],
                    epic: dto.epic ? dto.epic : '',
                    invoiceId: dto.invoiceId ? dto.invoiceId : '',
                    backlog: dto.backlog ? dto.backlog : false,
                    Id: dto.Id ? dto.Id : '',
                    sid: dto.sid ? dto.sid : 0,
                    Status: dto.Status ? dto.Status : '',
                    Summary: dto.Summary ? dto.Summary : '',
                    Type: dto.Type ? dto.Type : '',
                    buildType: dto.buildType ? dto.buildType : '',
                    Priority: dto.Priority ? dto.Priority : '',
                    version: dto.version ? dto.version : '',
                    Tags: dto.Tags ? dto.Tags : '',
                    Estimate: dto.Estimate ? dto.Estimate : 0,
                    bill_hours: dto.bill_hours ? dto.bill_hours : 0,
                    effective_hours: dto.effective_hours ? dto.effective_hours : 0,
                    bill_rate: dto.bill_rate ? dto.bill_rate : 0,
                    effective_rate: dto.effective_rate ? dto.effective_rate : 0,
                    Assignee: dto.Assignee ? dto.Assignee : '',
                    RankId: dto.RankId ? dto.RankId : 0,
                    userName: dto.userName ? dto.userName : '',
                    userEmail: dto.userEmail ? dto.userEmail : '',
                    studyId: dto.studyId ? dto.studyId : '',
                    Epics: dto.Epics ? dto.Epics : null,
                    StartDate: dto.StartDate ? dto.StartDate : '',
                    EndDate: dto.EndDate ? dto.EndDate : '',
                    Duration: dto.Duration ? dto.Duration : 0,
                    Progress: dto.Progress ? dto.Progress : 0,
                    Predecessor: dto.Predecessor ? dto.Predecessor : 0,
                    Children: dto.Children ? dto.Children : [],
                    isManual: dto.isManual ? dto.isManual : false,
                    name: dto.name ? dto.name : '',
                    created_user: dto.created_user ? dto.created_user : '',
                    created_userId: dto.created_userId ? dto.created_userId : '',
                    createdAt: dto.createdAt ? dto.createdAt : '',
                    updatedAt: dto.updatedAt ? dto.updatedAt : '',
                    deletedAt: dto.deletedAt ? dto.deletedAt : '',
                    open_at: dto.open_at ? dto.open_at : '',
                    assign_userId: dto.assign_userId ? dto.assign_userId : '',
                    assign_userName: dto.assign_userName ? dto.assign_userName : '',
                    assign_userEmail: dto.assign_userEmail ? dto.assign_userEmail : '',
                    closed: dto.closed ? dto.closed : false,
                    closed_at: dto.closed_at ? dto.closed_at : '',
                    closed_userId: dto.closed_userId ? dto.closed_userId : '',
                    closed_userName: dto.closed_userName ? dto.closed_userName : '',
                    notificationList: dto.notificationList ? dto.notificationList : [],
                    build: dto.build ? dto.build : false,
                    buildVersion: dto.buildVersion ? dto.buildVersion : '',
                    counter: dto.counter ? dto.counter : 0,

    
                };
            }    
    
    }


export interface ProjectCard extends BaseDto {
    id: string;
    aimId?: string,
    boardId?: string;
    listId?: string;    
    user?: User,
    userId?: string;
    sort?: number;
    position?: number;
    title?: string;
    description?: string;
    priority?: any;
    type?: any;
    startAt?: string | null;
    dueDate?: string | null;
    testLog?: ProjectLog[];
    content?: string;
    tasks?: Task[];
    images?: Image[];
    imageName?: string | null,
    imagePath?: string | null,
    imageType?: string | null,
    imageUrl?: string | null,
    archived?: boolean;
    createdAt?: string;
    updatedAt?: string | null;
    log?: ProjectLog[];

    //Support Ticket Fields
    orgId?: string; 
    projectId?: string; 
    support_posts?: SupportTicketPostDto[];
    epic?: string; 
    invoiceId?: string;         
    backlog?: boolean;
    Id?: string; 
    sid?: number; 
    Status?: string;
    Summary?: string;
    Type?: string;
    buildType?: string;
    Priority?: string;
    version?: string;
    Tags?: any;
    Estimate?: number;
    bill_hours?: number;
    effective_hours?: number;
    bill_rate?: number;
    effective_rate?: number;
    Assignee?: string;
    RankId?: number;
    userName?: string;        
    userEmail?: string;        
    studyId?: string;
    Epics?: EpicDto;
    StartDate?: string;
    EndDate?: string;
    Duration?: number;
    Progress?: number;
    Predecessor?: number;
    Children?: any[];
    isManual?: boolean;
    name?: string;
    created_user?: string;
    created_userId?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    open_at?: string;
    assign_userId?: string;
    assign_userName?: string;
    assign_userEmail?: string;
    closed?: boolean;
    closed_at?: string;
    closed_userId?: string;
    closed_userName?: string;
    notificationList?: User[];
    build?: boolean;
    buildVersion?: string;
    counter?: number;


}

export interface ProjectLog {
    id: string;
    sort?: number;
    boardId?: string;
    cardId?: string;
    listFrom?: string;
    listTo?: string;
    title?: string;
    logAt?: string | null;
    logBy?: string | null;
    failed?: boolean;
    passed?: boolean;
}

export interface Task {
    id?: string;
    sort?: number;
    title?: string;
    completed?: string;
}

export interface Label {
    id?: string;
    title?: string;
}

export interface Image {
    imageName?: string | null,
    imagePath?: string | null,
    imageType?: string | null,
    imageUrl?: string | null,
}



export interface supportTickets {
    id: string, 
    orgId: string, 
    projectId: string, 
    support_posts: SupportTicketPostDto[],
    epic?: string, 
    invoiceId?: string,         
    backlog?: boolean,
    Id?: string, 
    sid?: number, 
    Status?: string,
    Summary?: string,
    Type?: string,
    buildType?: string,
    Priority?: string,
    version?: string,
    Tags?: any,
    Estimate?: number,
    bill_hours?: number,
    effective_hours?: number,
    bill_rate?: number,
    effective_rate?: number,
    Assignee?: string,
    RankId?: number,
    userId?: string,
    userName?: string,        
    userEmail?: string,        
    studyId?: string,
    Epics?: EpicDto,
    StartDate?: string,
    EndDate?: string,
    Duration?: number,
    Progress?: number,
    Predecessor?: number,
    Children?: any[],
    isManual?: boolean,
    name?: string,
    description?: string,
    created_user?: string,
    created_userId?: string,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
    open_at?: string,
    assign_userId?: string,
    assign_userName?: string,
    assign_userEmail?: string,
    closed?: boolean,
    closed_at?: string,
    closed_userId?: string,
    closed_userName?: string,
    notificationList?: User[],
    build?: boolean,
    buildVersion?: string,
    counter?: number,
}


export interface EpicDto {
    id: string, 
    orgId: string, 
    rankId: number, 
    name: string, 
    description: string,
    keyField: string,
    headerText: string,
    value: string, 
    icon: string,
    maxCount: number,
    projectId: string,
    createId: string,
    ownerId: string,
    color: string,
    createdAt?: string,
    updatedAt?: string,
    deletedAt?: string,
}

export interface SupportTicketPostDto extends BaseDto {
    id: string, 
    orgId: string,
    supportTicketId: string,
    title: string, 
    message: string, 
    sent: boolean, 
    userId: string, 
    userEmail: string, 
    userName: string, 
    createdAt: string,
    image?: string,
    images?: string[],
    imageUrl?: string, 
    sent_at?: string,
    deletedAt?: string,
    closing_post?: boolean,
}









