import { calculatedAtoms, IAtom } from './atoms';
import { Wrapper } from './Wrapper';
export function markAsDirty(dependent: IAtom) {
    dependent.isDirty = true;
    dependent.dependents.forEach(markAsDirty);
}
function unlinkDependencies(prevDependencies: IAtom[], atom: IAtom) {
    prevDependencies
        .filter(dependency => atom.dependencies.indexOf(dependency) === -1)
        .forEach(dependency => dependency.dependents.splice(dependency.dependents.indexOf(atom), 1));
}
function linkToCalculated(atom: IAtom) {
    if (calculatedAtoms.length > 0) {
        const caller = calculatedAtoms[calculatedAtoms.length - 1];
        if (caller.dependencies.indexOf(atom) === -1) {
            caller.dependencies.push(atom);
        }
        if (atom.dependents.indexOf(caller) === -1) {
            atom.dependents.push(caller);
        }
    }
}
export function recalculate<T>(atom: IAtom<T>, resultGetter: () => T, wrapper = Wrapper) {
    calculatedAtoms.push(atom);
    const { dependencies } = atom;
    atom.dependencies = [];
    const result = resultGetter();
    // if (result !== atom.value) markAsDirty(atom);
    unlinkDependencies(dependencies, atom);
    atom.value = wrapper(result);
    atom.isDirty = false;
    calculatedAtoms.pop();

    return atom.value;
}
export function calculate<T>(atom: IAtom<T>, resultGetter: () => T, wrapper = Wrapper) {
    linkToCalculated(atom);
    if (!atom.isDirty) return atom.value;

    return recalculate(atom, resultGetter, wrapper);
}
