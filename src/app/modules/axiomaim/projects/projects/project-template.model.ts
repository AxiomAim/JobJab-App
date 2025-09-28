import {
    IBoard,
    ICard,
    IEpic,
    ILabel,
    IList,
    IMember,
    ITask,
} from 'app/modules/davesa/csv/protocols/protocol-template.types';

// -----------------------------------------------------------------------------------------------------
// @ Board
// -----------------------------------------------------------------------------------------------------
export class TBoard implements Required<IBoard> {
    id: string;
    orgId: string;
    userId: string;
    users: string[] | null;
    title: string;
    description: string | null;
    icon: string | null;
    lastActivity: string | null;
    tags: string[] | null;
    active: boolean | null;
    startAt: string | null;
    endAt: string | null;
    closeAt: string | null;
    lists: TList[];
    labels: TLabel[];

    /**
     * Constructor
     */
    constructor(board: IBoard) {
        this.id = board.id || null;
        this.orgId = board.orgId || null;
        this.userId = board.userId || null;
        this.users = board.users || null;
        this.title = board.title;
        this.description = board.description || null;
        this.icon = board.icon || null;
        this.lastActivity = board.lastActivity || null;
        this.tags = board.tags || null;
        this.active = board.active || null;
        this.startAt = board.startAt || null;
        this.endAt = board.endAt || null;
        this.lists = [];
        this.labels = [];
        // Lists
        if (board.lists) {
            this.lists = board.lists.map((list) => {
                if (!(list instanceof TList)) {
                    return new TList(list);
                }

                return list;
            });
        }

        // Labels
        if (board.labels) {
            this.labels = board.labels.map((label) => {
                if (!(label instanceof TLabel)) {
                    return new TLabel(label);
                }

                return label;
            });
        }
    }
}

// -----------------------------------------------------------------------------------------------------
// @ List
// -----------------------------------------------------------------------------------------------------
export class TList implements Required<IList> {
    id: string;
    orgId: string;
    userId: string;
    boardId: string;
    sort: number;
    position: number;
    title: string;
    cards: TCard[];
    /**
     * Constructor
     */
    constructor(list: IList) {
        this.id = list.id;
        this.orgId = list.orgId;
        this.userId = list.userId;
        this.boardId = list.boardId;
        this.sort = list.sort || null;
        this.position = list.position || null;
        this.title = list.title || null;
        this.cards = [];

        // Cards
        if (list.cards) {
            this.cards = list.cards.map((card) => {
                if (!(card instanceof TCard)) {
                    return new TCard(card);
                }

                return card;
            });
        }
    }
}

// -----------------------------------------------------------------------------------------------------
// @ Card
// -----------------------------------------------------------------------------------------------------
export class TCard implements Required<ICard> {
    id: string | null;
    boardId: string;
    listId: string;
    position: number;
    title: string;
    description: string | null;
    labels: TLabel[];
    dueDate: string | null;
    sort: number;
    storyPoints: number;
    content: string;
    tasks: ITask[];
    imageName: string | null;
    imagePath: string | null;
    imageType: string | null;
    imageUrl: string | null;
    archived: boolean;
    createdAt: string;
    updatedAt: string | null;    
    epic: boolean;
    epicChildren: IEpic[];

    /**
     * Constructor
     */
    constructor(card: ICard) {
        this.id = card.id || null;
        this.boardId = card.boardId;
        this.listId = card.listId;
        this.position = card.position;
        this.title = card.title;
        this.description = card.description || null;
        this.labels = [];
        this.dueDate = card.dueDate || null;
        this.sort = card.sort;
        this.storyPoints = card.storyPoints;
        this.content = card.content;
        this.tasks = [];
        this.imageName = card.imageName;
        this.imagePath = card.imagePath;
        this.imageType = card.imageType;
        this.imageUrl = card.imageUrl;
        this.archived = card.archived;
        this.createdAt = card.createdAt;
        this.updatedAt = card.updatedAt;
        this.epic = card.epic;
        this.epicChildren = [];


        // Labels
        if (card.labels) {
            this.labels = card.labels.map((label) => {
                if (!(label instanceof TLabel)) {
                    return new TLabel(label);
                }

                return label;
            });
        }
    }
}

// -----------------------------------------------------------------------------------------------------
// @ Epic
// -----------------------------------------------------------------------------------------------------
export class TEpic implements Required<IEpic> {
    id: string;
    parentId: string;
    sort: number;
    title: string;
    completed: string;
    cards: ICard[];
    /**
     * Constructor
     */
    constructor(epic: IEpic) {
        this.id = epic.id;
        this.parentId = epic.parentId;
        this.sort = epic.sort;
        this.title = epic.title;
        this.completed = epic.completed;
        this.cards = [];

        // Cards
        if (epic.cards) {
            this.cards = epic.cards.map((card) => {
                if (!(card instanceof TCard)) {
                    return new TCard(card);
                }

                return card;
            });
        }
    }
}


// -----------------------------------------------------------------------------------------------------
// @ Member
// -----------------------------------------------------------------------------------------------------
export class TTask implements Required<ITask> {
    id: string;
    sort: number;
    title: string;
    completed: string;

    /**
     * Constructor
     */
    constructor(member: ITask) {
        this.id = member.id || null;
        this.sort = member.sort;
        this.title = member.title || null;
        this.completed = member.completed;
    }
}

// -----------------------------------------------------------------------------------------------------
// @ Label
// -----------------------------------------------------------------------------------------------------
export class TLabel implements Required<ILabel> {
    id: string | null;
    boardId: string;
    title: string;

    /**
     * Constructor
     */
    constructor(label: ILabel) {
        this.id = label.id || null;
        this.boardId = label.boardId;
        this.title = label.title;
    }
}
