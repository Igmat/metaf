interface IAtom<T = unknown> {
    dependencies: IAtom[];
    dependents: IAtom[];
    isDirty: boolean;
    value: T;
}
const calculatedAtoms: IAtom[] = [];

function markAsDirty(dependent: IAtom) {
    dependent.isDirty = true;
    dependent.dependents.forEach(markAsDirty);
}
function unlinkDependencies(prevDependencies: IAtom[], atom: IAtom) {
    prevDependencies
        .filter(dependency =>
            atom.dependencies.indexOf(dependency) === -1)
        .forEach(dependency =>
            dependency.dependents.splice(dependency.dependents.indexOf(atom), 1));
}
function linkToCalculated(atom: IAtom) {
    if (calculatedAtoms.length > 0) {
        const caller = calculatedAtoms[calculatedAtoms.length - 1];
        if (caller.dependencies.indexOf(atom) === -1) caller.dependencies.push(atom);
        if (atom.dependents.indexOf(caller) === -1) atom.dependents.push(caller);
    }
}
function recalculate<T>(atom: IAtom<T>, resultGetter: () => T) {
    calculatedAtoms.push(atom);
    const { dependencies } = atom;
    atom.dependencies = [];
    const result = resultGetter();
    // if (result !== atom.value) markAsDirty(atom);
    unlinkDependencies(dependencies, atom);
    atom.value = (typeof result === 'object' && result !== null)
        ? observe(result)
        : result;
    atom.isDirty = false;
    calculatedAtoms.pop();

    return atom.value;
}
function rerun<T>(atom: IAtom<T>, resultGetter: () => T) {
    calculatedAtoms.push(atom);
    const { dependencies } = atom;
    atom.dependencies = [];
    const result = resultGetter();
    // if (result !== atom.value) markAsDirty(atom);
    unlinkDependencies(dependencies, atom);
    atom.value = result;
    atom.isDirty = false;
    calculatedAtoms.pop();

    return atom.value;
}
export function observe<T extends {}>(obj: T) {
    const objAtoms: {
        [index: string]: IAtom | undefined;
        [index: number]: IAtom | undefined;
    } = {};
    const getAtom = (p: string | number) => {
        const pName = (p === 'constructor')
            ? 'constructorHolder'
            : p;
        const existingAtom = objAtoms[pName];

        return existingAtom !== undefined
            ? existingAtom
            : objAtoms[pName] = {
                dependencies: [],
                dependents: [],
                isDirty: true,
                value: undefined,
            };
    };

    return new Proxy(obj, {
        defineProperty(target, p, attributes) {
            const { value } = attributes;
            const atom = {
                dependencies: [],
                dependents: [],
                isDirty: true,
                value,
            };
            // TODO: fix `symbol` type
            Reflect.set(objAtoms, p, atom);

            return Reflect.defineProperty(target, p, attributes);
        },

        // TODO: fix `symbol` type
        get(target, p: string | number, receiver) {
            const atom = getAtom(p);
            linkToCalculated(atom);
            if (atom.isDirty) {
                recalculate(
                    atom,
                    () => Reflect.get(target, p, receiver),
                );
            }

            return atom.value;
        },

        // TODO: fix `symbol` type
        set(target, p: string | number, value, receiver) {
            const atom = getAtom(p);

            const result = Reflect.set(target, p, value, receiver);
            markAsDirty(atom);

            return result;
        },
        deleteProperty(target, p) {
            return Reflect.deleteProperty(target, p);
        },

        getOwnPropertyDescriptor(target, p) {
            return Reflect.getOwnPropertyDescriptor(target, p);
        },
        getPrototypeOf(target) {
            return Reflect.getPrototypeOf(target);
        },

        has(target, p) {
            return Reflect.has(target, p);
        },

        isExtensible(target) {
            return Reflect.isExtensible(target);
        },

        ownKeys(target) {
            return Reflect.ownKeys(target);
        },

        preventExtensions(target) {
            return Reflect.preventExtensions(target);
        },

        setPrototypeOf(target, v) {
            return Reflect.setPrototypeOf(target, v);
        },
    });
}
let toRun: (() => void)[] = [];
export function autorun<T>(observableFn: () => T, reRunFn?: () => void, clear?: () => void) {
    const exec = clear
        ? () => {
            clear();

            return rerun(atom, observableFn);
        }
        : () => rerun(atom, observableFn);
    const atom: IAtom<T> = {
        dependencies: [],
        dependents: [],
        get isDirty() {
            return false;
        },
        set isDirty(val) {
            if (toRun.length === 0) {
                setTimeout(() => {
                    toRun.forEach(execFn => execFn());
                    toRun = [];
                });
            }
            if (val && toRun.indexOf(exec) === -1) {
                toRun.push(reRunFn || exec);
            }
        },
        value: undefined as any, // TODO: fix any
    };

    return exec;
}

export class Observable {
    constructor() {
        return observe(this);
    }
}
