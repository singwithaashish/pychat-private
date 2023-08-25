export type Message = {
    id: number;
    text: string;
    createdAt: Date;
    sender: string;
    };

    export type History = {
        internal: string[];
    };