import { IAtom } from './atoms';
import { markAsDirty } from './calculations';
export interface ITransaction {
    mutatedAtoms: IAtom[];
}
let mutating = false;
let mutatedAtoms: IAtom[] = [];
export function mutate<T>(atom: IAtom<T>, mutation: () => boolean, onSet?: (tx: ITransaction) => void) {
    if (!mutatedAtoms.length && onSet) {
        setTimeout(() => {
            onSet({ mutatedAtoms });
            mutatedAtoms = [];
        });
    }
    if (!mutating) {
        mutatedAtoms.push(atom);
    }
    mutating = true;
    const result = mutation();
    markAsDirty(atom);
    mutating = false;

    return result;
}
