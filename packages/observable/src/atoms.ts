export interface IDirtyAtom<T = unknown> {
    source: any;
    p: string | number;
    dependencies: IAtom[];
    dependents: IAtom[];
    isDirty: true;
    value?: T;
}
export interface ICleanAtom<T = unknown> {
    source: any;
    p: string | number;
    dependencies: IAtom[];
    dependents: IAtom[];
    isDirty: false;
    value: T;
}
export type IAtom<T = unknown> = IDirtyAtom<T> | ICleanAtom<T>;
export const calculatedAtoms: IAtom[] = [];
