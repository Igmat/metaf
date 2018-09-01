import { PromiseCache } from './sync';

export const context = {
    cache: new WeakMap<Function, { [args: string]: any }>(),
};

export function runInSync(app: () => void, cache = new WeakMap<Function, { [args: string]: any }>()) {
    context.cache = cache;
    try {
        app();
    } catch (err) {
        if (!(err instanceof PromiseCache)) throw err;
        err.resolved.then(() => runInSync(app, cache));
    }
}
