import { getAtomCreator } from './atoms';
import { calculate, linkToCalculated, recalculate } from './calculations';
import { ITransaction, mutate } from './mutations';
import { Observable } from './Observable';
// tslint:disable: no-unsafe-any

export function observeFunction<T extends Function>(fn: T, onSet?: (tx: ITransaction) => void) {
    const createAtomIfNotExists = getAtomCreator(fn);

    return new Proxy(fn, {
        apply(target, thisArg, args) {
            const p = JSON.stringify({ args });
            const atom = createAtomIfNotExists(p);
            // function might have side effects, so we don't memorize it
            // TODO: investigate if `mutation` information is sufficient enough
            // to detect when function is pure
            linkToCalculated(atom);

            return recalculate(atom, () => Reflect.apply(target, thisArg, args), observe);
        },
    });
}

export function observeObj<T extends {}>(obj: T, onSet?: (tx: ITransaction) => void): T {
    const createAtomIfNotExists = getAtomCreator(obj);

    return new Proxy(obj, {
        // TODO: fix `symbol` type
        get(target, p: string | number, receiver) {
            // preserving Proxy invariant
            const desc = Reflect.getOwnPropertyDescriptor(target, p);
            if (desc && !desc.configurable && !desc.writable) {
                return Reflect.get(target, p, receiver);
            }
            const atom = createAtomIfNotExists(p);

            return calculate(atom, () => Reflect.get(target, p, receiver), observe);
        },
        // TODO: fix `symbol` type
        set(target, p: string | number, value, receiver) {
            const atom = createAtomIfNotExists(p, value);

            return mutate(atom, () => Reflect.set(target, p, value, receiver), onSet);
        },
        // TODO: fix `symbol` type
        defineProperty(target, p: string | number, attributes) {
            const { value } = attributes;
            createAtomIfNotExists(p, value);

            return Reflect.defineProperty(target, p, attributes);
        },
    });
}
const arrayMethodKeys = Reflect.ownKeys(Array.prototype);
const getObserver = (p: string | number | symbol) =>
    arrayMethodKeys.indexOf(p) === -1
        ? observe
        : <T>(obj: T) => obj;
export function observeArray<T extends unknown[]>(arr: T, onSet?: (tx: ITransaction) => void) {
    const createAtomIfNotExists = getAtomCreator(arr);

    return new Proxy(arr, {
        // TODO: fix `symbol` type
        get(target, p: string | number, receiver) {
            const atom = createAtomIfNotExists(p);

            return calculate(atom, () => Reflect.get(target, p, receiver), getObserver(p));
        },
        // TODO: fix `symbol` type
        set(target, p: string | number, value, receiver) {
            const atom = createAtomIfNotExists(p, value);

            return mutate(atom, () => Reflect.set(target, p, value, receiver), onSet);
        },
        // TODO: fix `symbol` type
        defineProperty(target, p: string | number, attributes) {
            const { value } = attributes;
            createAtomIfNotExists(p, value);

            return Reflect.defineProperty(target, p, attributes);
        },
    });
}

export function observe<T>(obj: T, onSet?: (tx: ITransaction) => void): T {
    switch (typeof obj) {
        case 'object':
            if (obj === null) return obj;
            if (obj instanceof Observable) return obj;
            if (obj instanceof Promise) return obj;
            if (Array.isArray(obj)) return observeArray(obj, onSet);

            return observeObj(obj, onSet);
        case 'function':
            return observeFunction(obj, onSet);
        default:
            return obj;
    }
}
