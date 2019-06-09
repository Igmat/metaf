export interface IAbstractAtom {
    source: Function | object;
    name: string | number;
    dependencies: IAtom[];
    dependents: IAtom[];
}
export interface IDirtyAtom<T = unknown> extends IAbstractAtom {
    isDirty: true;
    value?: T;
}
export interface ICleanAtom<T = unknown> extends IAbstractAtom {
    isDirty: false;
    value: T;
}
export type IAtom<T = unknown> = IDirtyAtom<T> | ICleanAtom<T>;
export const calculatedAtoms: IAtom[] = [];

export function getAtomCreator(obj: Function | object) {
    const objAtoms: {
        [index: string]: IAtom | undefined;
        [index: number]: IAtom | undefined;
    } = {};
    const createAtomIfNotExists = <V>(p: string | number, value?: V) => {
        const hasOwn = Object.prototype.hasOwnProperty.call(objAtoms, p);
        const existingAtom = hasOwn
            ? objAtoms[p]
            : undefined;

        return existingAtom !== undefined
            ? existingAtom
            : objAtoms[p] = {
                dependencies: [],
                dependents: [],
                isDirty: true,
                name: p,
                source: obj,
                value,
            };
    };

    return createAtomIfNotExists;
}
