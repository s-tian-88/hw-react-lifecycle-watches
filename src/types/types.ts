export interface IWatchData {
    title: string;
    timezone: number;
    
}

export interface IForm extends IWatchData {}

export interface IWatchState {
    loaded: boolean;
    hour: string;
    minute: string;
    second: string;
}
