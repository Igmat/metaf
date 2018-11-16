import { Constructable } from 'metaf-resolvable';
import { context } from './runInSync';
import { AsyncPrimitivesWrapper, sync } from './sync';
type TypedFunction<T, ARGS extends unknown[]> = (...args: ARGS) => T;
function isFunction<T, ARGS extends unknown[]>(arg: unknown): arg is TypedFunction<T, ARGS> {
    return typeof arg === 'function';
}
export type SynchronizedProperty<T> = T extends (...args: infer ARGS) => infer R
    ? TypedFunction<AsyncPrimitivesWrapper<R>, ARGS>
    : AsyncPrimitivesWrapper<T>;
export type Synchronous<I extends object> = {
    [P in keyof I]: SynchronizedProperty<I[P]>;
};
function synchronizeFunction<R, ARGS extends unknown[]>(method: TypedFunction<R, ARGS>): TypedFunction<AsyncPrimitivesWrapper<R>, ARGS> {
    return (...args: ARGS) => {
        if (!context.cache.has(method)) context.cache.set(method, {});
        const functionCache = context.cache.get(method) as { [arg: string]: R };
        const key = JSON.stringify(args);
        if (!functionCache.hasOwnProperty(key)) functionCache[key] = method(...args);

        return sync(functionCache[key]);
    };
}
export function syncService<I extends object>(serviceConstructor: Constructable<[], I>): Synchronous<I> {
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
