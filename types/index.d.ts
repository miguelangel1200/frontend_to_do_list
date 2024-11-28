export {}

declare global {
    interface IActivity{
        idactivities: string;
        title: string;
        description: string;
        state: string;
        activate: boolean;
    }
}