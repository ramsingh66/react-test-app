export type FormValues = {
    readonly name: string;
    readonly age: number;
    readonly gender: 'Male' | 'Female' | 'Other';
    readonly specials?: string;
}