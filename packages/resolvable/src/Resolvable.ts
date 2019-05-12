import { AbstractResolvable, IDependencies, IInjections } from './AbstractResolvable';
import { resolveFor, resolveRequirements } from './Application';
import { Constructable } from './utils';

export type Resolvable<I extends IInjections, P> =
    P extends new (...args: infer ARGS) => infer R
    ? new (...args: ARGS) => AbstractResolvable<I> & R
    : new () => AbstractResolvable<I>;

/**
 * ResolvableClassFn interface
 * @description it's a factory function that creates new resolvable classes
 * @template P typeof parent class that will be used for creating new classes
 */
export interface IResolvableClassFn<P extends Constructable = new () => object> {
    /**
     * Resolvable class factory
     * @description Resolvable
     * @template I type of dependencies' dictionary
     * @template R type of requirements' tuple
     * @param injections dependencies that will be used by class directly
     * @param requirements dependencies that should exist in code that use this class
     * @returns resolvable class to extend
     */
    <I extends IInjections = {}, R extends any[]= []>(injections: I, ...requirements: R): Resolvable<I, P>;
    /**
     * Resolvable class factory
     * @description Resolvable
     * @template R type of requirements' tuple
     * @param requirements dependencies that should exist in code that use this class
     * @returns resolvable class to extend
     */
    <R extends any[]= []>(...requirements: R): Resolvable<{}, P>;
}

/**
 * Creator of Resolvable factories
 * @description this function is designed to be used by packages like `metaf-react`
 * in order to create factory of Resolvable {something}, that afterwards would be used
 * by users in particular projects
 * @template P typeof parent class that will be used for creating new classes
 * @param [parent] class that should be a parent for each class return from factory function
 * @returns factory for creating resolvable classes
 */
export function Resolvable<P extends Constructable = new () => object>(parent = class {} as P): IResolvableClassFn<P> {
    function ResolvableClassFn<
        I extends IInjections = {},
        R extends any[]= []>(
            ...requirements: R): Resolvable<I, P> {
        const injections = requirements[0];

        class ResolvableImpl extends parent.prototype.constructor {
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
