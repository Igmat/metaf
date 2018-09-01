import { ensure } from '../utils';
import { context } from './runInSync';
import { AsyncPrimitivesWrapper, sync } from './sync';
export type Initiable<I> = new () => I;
type TypedFunction<T, ARGS extends any[]> = (...args: ARGS) => T;
function isFunction<T, ARGS extends any[]>(arg: any): arg is TypedFunction<T, ARGS> {
    return typeof arg === 'function';
}
export type SynchronizedProperty<T> = T extends (...args: infer ARGS) => infer R
    ? TypedFunction<AsyncPrimitivesWrapper<R>, ARGS>
    : AsyncPrimitivesWrapper<T>;
export type Synchronous<I extends object> = {
    [P in keyof I]: SynchronizedProperty<I[P]>;
};
function synchronizeFunction<R, ARGS extends any[]>(method: TypedFunction<R, ARGS>): TypedFunction<AsyncPrimitivesWrapper<R>, ARGS> {
    return (...args: ARGS) => {
        if (!context.cache.has(method)) context.cache.set(method, {});
        const functionCache = ensure(context.cache.get(method));
        const key = JSON.stringify(args);
        if (!functionCache.hasOwnProperty(key)) functionCache[key] = method(...args);

        return sync(functionCache[key]);
    };
}
export function syncService<I extends object>(serviceConstructor: Initiable<I>): Synchronous<I> {
    const instance = new serviceConstructor();
    const result: Partial<Synchronous<I>> = {};
    // We want to wrap all properties, including inherited,
    // so we don't need tslint warning as about not filtering
    // forin statement to only own properties
    // tslint:disable-next-line:forin
    for (const key in instance) {
        const property = instance[key];
        result[key] = (isFunction(property)
            ? synchronizeFunction(property)
            : (property instanceof Promise)
                ? sync(property)
                : property) as Synchronous<I>[Extract<keyof Synchronous<I>, string>];
    }

    return result as Synchronous<I>;
}
