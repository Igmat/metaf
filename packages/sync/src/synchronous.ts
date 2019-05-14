import { context } from './runInSync';
import { AsyncPrimitivesWrapper, sync } from './sync';

type TypedFunction<T, ARGS extends unknown[]> = (...args: ARGS) => T;
function isFunction<T, ARGS extends unknown[]>(arg: unknown): arg is TypedFunction<T, ARGS> {
    return typeof arg === 'function';
}
type SynchronizedProperty<T> =
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
function synchronizeFunction<R, ARGS extends unknown[]>(
    method: TypedFunction<R, ARGS>,
    originalThis: object): TypedFunction<AsyncPrimitivesWrapper<R>, ARGS> {
    return (...args: ARGS) => {
        if (!context.cache.has(method)) context.cache.set(method, {});
        const functionCache = context.cache.get(method) as { [arg: string]: R };
        const key = JSON.stringify(args);
        if (!functionCache.hasOwnProperty(key)) functionCache[key] = method.call(originalThis, ...args);

        return sync(functionCache[key]);
    };
}
export function synchronous<I extends object>(obj: I): Synchronous<I> {
    return new Proxy(obj, {
        get(target, p, receiver) {
            const result = Reflect.get(target, p, receiver);

            return isFunction(result)
                ? synchronizeFunction(result, obj)
                : (result instanceof Promise)
                    ? sync(result)
                    : result;
        },
    }) as Synchronous<I>;
}

