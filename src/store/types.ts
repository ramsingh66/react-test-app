export enum ActionType {
    SET_NAME = 'SET_NAME',
    SET_AGE = 'SET_AGE',
    SET_GENDER = 'SET_GENDER',
    SET_ADDRESS = 'SET_ADDRESS',
    SUBMIT = 'SUBMIT'
}


export type Action = {
    type: ActionType.SET_NAME;
    value: string;
} | {
    type: ActionType.SET_AGE;
    value: number;
} | {
    type: ActionType.SET_ADDRESS;
    value: string;
} | {
    type: ActionType.SET_GENDER;
    value: string;
} | {
    type: ActionType.SUBMIT;
}

export type Info = {
    readonly name?: string,
    readonly age?: number,
    readonly address?: string,
    readonly gender?: string
}

export type State = Info & {
    readonly record: ReadonlyArray<Info>
}


