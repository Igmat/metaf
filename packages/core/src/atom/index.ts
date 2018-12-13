interface IAtom {
    dependencies: IAtom[];
    dependents: IAtom[];
    isDirty: boolean;
    value: any;
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
function recalculate(atom: IAtom, resultGetter: () => any) {
    calculatedAtoms.push(atom);
    const { dependencies } = atom;
    atom.dependencies = [];
    const result = resultGetter();
    if (result !== atom.value) markAsDirty(atom);
    unlinkDependencies(dependencies, atom);
    atom.value = result;
    atom.isDirty = false;
    calculatedAtoms.pop();
}
const observableHandler: ProxyHandler<Observable> = {
    defineProperty(target, p, attributes) {
        const {
            configurable,
            enumerable,
            get = () => atom.value,
            set = (val: any) => atom.value = val,
            value,
        } = attributes;
        const atom: IAtom = {
            dependencies: [],
            dependents: [],
            isDirty: false,
            value,
        };
        const getter = () => {
            linkToCalculated(atom);
            atom.isDirty && recalculate(
                atom,
                get,
            );

            return atom.value;
        };
        const setter = (val: any) => {
            set(val);
            markAsDirty(atom);
        };

        return Reflect.defineProperty(target, p, {
            configurable,
            enumerable,
            get: getter,
            set: setter,
        });
    },

    deleteProperty(target, p) {
        return Reflect.deleteProperty(target, p);
    },

    get(target, p, receiver) {
        return Reflect.get(target, p, receiver);
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

    set(target, p, value, receiver) {
        return Reflect.set(target, p, value, receiver);
    },

    setPrototypeOf(target, v) {
        return Reflect.setPrototypeOf(target, v);
    },
};

export function autorun<T>(fn: () => T, clear?: () => void) {
    const exec = () => {
        clear && clear();
        // linkToCalculated(atom);
        recalculate(atom, fn);
    };
    const atom: IAtom = {
        dependencies: [],
        dependents: [],
        get isDirty() {
            return false;
        },
        set isDirty(val) {
            if (val) exec();
        },
        value: undefined,
    };

    return exec;
}

export class Observable {
    constructor() {
        return new Proxy(this, observableHandler);
    }
}
