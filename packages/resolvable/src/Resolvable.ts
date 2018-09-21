import { AbstractResolvable, IDependencies, IInjections } from './AbstractResolvable';
import { resolveFor, resolveRequirements } from './Application';
import { Constructable } from './utils';

export type Resolvable<I extends IInjections, P> =
    P extends new (...args: infer ARGS) => infer R
    ? new (...args: ARGS) => AbstractResolvable<I> & R
    : new () => AbstractResolvable<I>;

export interface IResolvableClassFn<P extends Constructable = new () => unknown> {
    /**
     * // TODO: comment Resolvable
     * @description Resolvable
     * @template I
     * @template R
     * @param [injections] dependencies that will be used by class directly
     * @param requirements dependencies that should exist in code that use this class
     * @returns resolvable class to extend
     */
    <I extends IInjections = {}, R extends any[]= []>(injections?: I, ...requirements: R): Resolvable<I, P>;
    /**
     * // TODO: comment Resolvable
     * @description Resolvable
     * @template I
     * @template R
     * @param requirements dependencies that should exist in code that use this class
     * @returns resolvable class to extend
     */
    <I extends IInjections = {}, R extends any[]= []>(...requirements: R): Resolvable<I, P>;
}

/**
 * // TODO: comment Resolvable
 * @description Resolvable
 * @template P
 * @param [parent] class that should be a parent for this one
 * @returns
 */
export function Resolvable<P extends Constructable = new () => unknown>(parent = Object.prototype.constructor as P): IResolvableClassFn<P> {
    function ResolvableClassFn<
        I extends IInjections = {},
        R extends any[]= []>(
            ...requirements: R): Resolvable<I, P> {
        const injections = requirements[0];

        /**
         * // TODO: comment ResolvableImpl
         * @description Resolvable impl
         */
        class ResolvableImpl extends parent.prototype.constructor {

            /**
             * // TODO: comment dependencies
             * @description Dependencies  of resolvable impl
             */
            protected readonly dependencies: Readonly<IDependencies<I>>;
            constructor(...args: any[]) {
                super(...args);
                this.dependencies = (typeof injections === 'object')
                    ? resolveFor(this, ResolvableImpl, injections as I, args)
                    : resolveFor(this, ResolvableImpl, {} as I, args);
            }
        }

        return ((typeof injections === 'object')
            ? resolveRequirements(requirements.slice(1), ResolvableImpl)
            : resolveRequirements(requirements, ResolvableImpl)) as any;
    }

    return ResolvableClassFn;
}
