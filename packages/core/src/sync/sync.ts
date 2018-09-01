const methodsToThrow = [
    'getPrototypeOf',
    'setPrototypeOf',
    'isExtensible',
    'preventExtensions',
    'getOwnPropertyDescriptor',
    'has',
    'get',
    'set',
    'deleteProperty',
    'defineProperty',
    'enumerate',
    'ownKeys',
    'apply',
    'construct',
];
export class PromiseCache {
    content = new WeakMap<Promise<any>, any>();
    proxies = new WeakMap<Promise<any>, any>();
    resolved = Promise.resolve<any>(undefined);
}
const promiseCache = new PromiseCache();
const trap = () => {
    throw promiseCache;
};
const pendingHandler = methodsToThrow.reduce((result, method) => ({...result,  [method]: trap}), {});
type Primitives = string | number | boolean | symbol | undefined | null;
export type PrimitivesWrapper<T extends any> = T extends Primitives ? { value: T } : T;
export type AsyncPrimitivesWrapper<T extends any> = T extends Promise<infer R>
    ? PrimitivesWrapper<R>
    : T;
export function sync<P>(promise: P): AsyncPrimitivesWrapper<P> {
    if (!(promise instanceof Promise)) return promise as AsyncPrimitivesWrapper<P>;
    if (promiseCache.content.has(promise)) return promiseCache.content.get(promise);
    if (promiseCache.proxies.has(promise)) return promiseCache.proxies.get(promise);
    promiseCache.resolved = Promise.all([
        promiseCache.resolved,
        promise.then(value => promiseCache.content.set(promise, wrapPrimitive(value))),
    ]);
    const pendingProxy = new Proxy({}, pendingHandler) as AsyncPrimitivesWrapper<P>;
    promiseCache.proxies.set(promise, pendingProxy);

    return pendingProxy;
}

function wrapPrimitive<T extends any>(value: T) {
    if (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'symbol' ||
        typeof value === 'undefined' ||
        value === null) {
        return { value } as PrimitivesWrapper<T>;
    }

    return value as PrimitivesWrapper<T>;
}
