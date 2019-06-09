export type Constructable<ARGS extends any[] = any[], I extends object = object> = new (...args: ARGS) => I;
export type Callable<R = unknown> = () => R;
export type Injectable = Constructable | Callable;

export function isConstructor(obj: Injectable): obj is Constructable {
    // tslint:disable-next-line: no-unsafe-any
    return obj.hasOwnProperty('prototype') && !!obj.prototype.constructor.name;
}
export function isCallable(obj: Injectable): obj is Callable {
    // TODO: find better solution for such check
    // tslint:disable-next-line: strict-type-predicates
    return typeof obj === 'function';
}
