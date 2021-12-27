export type Constructable = new () => any;
export type Callable = () => any;
export type Injectable = Constructable | Callable;
export type AbstractClass = abstract new (...args: any) => any;
export type AbstractFn = (...args: any) => any;

export function isConstructor(obj: Injectable): obj is Constructable {
    // tslint:disable-next-line: no-unsafe-any
    return obj.hasOwnProperty('prototype') && !!obj.prototype.constructor.name;
}
export function isCallable(obj: Injectable): obj is Callable {
    // TODO: find better solution for such check
    // tslint:disable-next-line: strict-type-predicates
    return typeof obj === 'function';
}
