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
        const pName = (p === 'constructor')
            ? 'constructorHolder'
            : p;
        const existingAtom = objAtoms[pName];

        return existingAtom !== undefined
            ? existingAtom
            : objAtoms[pName] = {
                source: obj,
                name: p,
                dependencies: [],
                dependents: [],
                isDirty: true,
                value,
            };
    };

    return createAtomIfNotExists;
}
