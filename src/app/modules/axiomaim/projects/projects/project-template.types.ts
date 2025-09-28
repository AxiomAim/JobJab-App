export interface IBoard {
        id: string;
        orgId: string;
        userId: string;
        users: string[];
        title: string;
        description: string | null;
        icon: string | null;
        lastActivity: string | null;
        tags?: string[] | null;
        active?: boolean | null;
        startAt?: string | null;
        endAt?: string | null;
        closeAt?: string | null;
        lists?: IList[];
        labels?: ILabel[];
}

export interface IList {
    id: string;
    orgId: string;
    userId: string;
    boardId: string;
    sort?: number;
    position?: number;
    title?: string;
    cards?: ICard[];
}

export interface ICard {
    id?: string | null;
    boardId: string;
    listId: string;
    position: number;
    title: string;
    description?: string | null;
    labels?: ILabel[];
    dueDate?: string | null;
    sort: number;
    storyPoints?: number;
    content?: string;
    tasks?: ITask[];
    imageName?: string | null,
    imagePath?: string | null,
    imageType?: string | null,
    imageUrl?: string | null,
    archived?: boolean;
    createdAt?: string;
    updatedAt?: string | null;    
    epic?: boolean;
    epicChildren?: IEpic[];
}

export interface IMember {
    id?: string | null;
    name: string;
    avatar?: string | null;
}

export interface ILabel {
    id: string | null;
    boardId: string;
    title: string;
}

export interface ITask {
    id?: string;
    sort?: number;
    title?: string;
    completed?: string;
}

export interface IEpic {
    id?: string;
    parentId?: string;
    sort?: number;
    title?: string;
    completed?: string;
    cards?: ICard[];
}
