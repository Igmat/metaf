import { Callable, Constructable, isConstructor } from 'metaf-resolvable';
import { context } from './runInSync';
import { AsyncPrimitivesWrapper, sync } from './sync';
type TypedFunction<T, ARGS extends unknown[]> = (...args: ARGS) => T;
function isFunction<T, ARGS extends unknown[]>(arg: unknown): arg is TypedFunction<T, ARGS> {
    return typeof arg === 'function';
}
export type SynchronizedProperty<T> =
    T extends () => infer R
    ? () => AsyncPrimitivesWrapper<R>
    // FIXME: remove this hack for JSX syntax when TS will properly use createElement signature
    : T extends (props: infer PROPS, ...args: infer ARGS) => infer R
    ? (props: PROPS, ...args: ARGS) => AsyncPrimitivesWrapper<R>
    : T extends (...args: infer ARGS) => infer R
    ? TypedFunction<AsyncPrimitivesWrapper<R>, ARGS>
    : AsyncPrimitivesWrapper<T>;
export type Synchronous<I extends object> = {
    [P in keyof I]: SynchronizedProperty<I[P]>;
};
function synchronizeFunction<R, ARGS extends unknown[]>(method: TypedFunction<R, ARGS>): TypedFunction<AsyncPrimitivesWrapper<R>, ARGS> {
    return function (this: unknown, ...args: ARGS) {
        if (!context.cache.has(method)) context.cache.set(method, {});
        const functionCache = context.cache.get(method) as { [arg: string]: R };
        const key = JSON.stringify(args);
        if (!functionCache.hasOwnProperty(key)) functionCache[key] = method.call(this, ...args);

        return sync(functionCache[key]);
    };
}
export function syncService<I extends object>(serviceConstructor: Constructable<[], I> | Callable<I>): Synchronous<I> {
    const instance = isConstructor(serviceConstructor)
        ? new serviceConstructor()
        : serviceConstructor();
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
