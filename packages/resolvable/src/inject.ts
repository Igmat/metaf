import { IDependencies, IInjections } from "./AbstractResolvable";
import { resolveFor } from "./Application";

export function inject<I extends IInjections = {}, ARGS extends unknown[] = unknown[], R = unknown>(
    injections: I = {} as I,
    fn: (dependencies: IDependencies<I>) => (...args: ARGS) => R,
) {
    return (...args: ARGS) => fn(resolveFor(fn, injections, undefined, args))(...args);
}
