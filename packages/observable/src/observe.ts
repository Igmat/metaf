import { IAtom } from './atoms';
import { calculate } from './calculations';
import { ITransaction, mutate } from './mutations';
import { Observable } from './Observable';
import { Wrapper } from './Wrapper';

export function observe<T extends {}>(obj: T, onSet?: (tx: ITransaction) => void) {
    if (obj instanceof Observable) {
        return obj;
    }
    const wrapper: Wrapper = result => (
        typeof result === 'object' &&
        result !== null &&
        !(result instanceof Promise))
        ? observe(result, onSet)
        : result;
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
                p,
                dependencies: [],
                dependents: [],
                isDirty: true,
                value,
            };
    };

    return new Proxy(obj, {
        // TODO: fix `symbol` type
        defineProperty(target, p: string | number, attributes) {
            const { value } = attributes;
            createAtomIfNotExists(p, value);

            return Reflect.defineProperty(target, p, attributes);
        },
        // TODO: fix `symbol` type
        get(target, p: string | number, receiver) {
            const atom = createAtomIfNotExists(p);

            return calculate(atom, () => Reflect.get(target, p, receiver), wrapper);
        },
        // TODO: fix `symbol` type
        set(target, p: string | number, value, receiver) {
            const atom = createAtomIfNotExists(p, value);

            return mutate(atom, () => Reflect.set(target, p, value, receiver), onSet);
        },
    });
}
