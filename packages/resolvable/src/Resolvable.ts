import { AbstractResolvable, IDependencies, IInjections } from './AbstractResolvable';
import { resolveFor, resolveRequirements } from './Application';
import { Constructable } from './utils';

export type Resolvable<I extends IInjections, P> =
    P extends new (...args: infer ARGS) => infer R
    ? new (...args: ARGS) => AbstractResolvable<I> & R
    : new () => AbstractResolvable<I>;

/**
 * // TODO: comment Resolvable
 * @description Resolvable
 * @template I
 * @template R
 * @template P
 * @param [injections] dependencies that will be used by class directly
 * @param [parent] class that should be a parent for this one
 * @param requirements dependencies that should exist in code that use this class
 * @returns resolvable class to extend
 */
export function Resolvable<
    I extends IInjections = {},
    R extends any[] = [],
    P extends Constructable = new () => unknown>(
    injections: I = {} as I,
    parent = Object.prototype.constructor as P,
    ...requirements: R): Resolvable<I, P> {
    class ResolvableImpl extends parent.prototype.constructor {
        protected readonly dependencies: Readonly<IDependencies<I>>;
        constructor(...args: any[]) {
            super(...args);
            this.dependencies = resolveFor(this, ResolvableImpl, injections, args);
        }
    }
    resolveRequirements(requirements, ResolvableImpl);

    return ResolvableImpl as any;
}
