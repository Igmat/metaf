import { AbstractResolvable, IDependencies, IInjections } from './AbstractResolvable';
import { resolveFor, resolveRequirements } from './Application';
import { AbstractClass } from './utils';

export type Resolvable<I extends IInjections, P extends AbstractClass> =
    abstract new (...args: ConstructorParameters<P>) => InstanceType<P> & AbstractResolvable<I>;

/**
 * ResolvableClassFn interface
 * @description it's a factory function that creates new resolvable classes
 * @template P typeof parent class that will be used for creating new classes
 */
export interface IResolvableClassFn<P extends AbstractClass> {
    /**
     * Resolvable class factory
     * @description Resolvable
     * @template I type of dependencies' dictionary
     * @template R type of requirements' tuple
     * @param injections dependencies that will be used by class directly
     * @param requirements dependencies that should exist in code that use this class
     * @returns resolvable class to extend
     */
    <I extends IInjections = {}, R extends unknown[] = unknown[]>(injections: I, ...requirements: R): Resolvable<I, P>;

    /**
     * Resolvable class factory
     * @description Resolvable
     * @returns resolvable class to extend
     */
    (): Resolvable<{}, P>
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
export function Resolvable<P extends AbstractClass>(parent: P): IResolvableClassFn<P> {
    function ResolvableClassFn<I extends IInjections = {}, R extends unknown[] = unknown[]>(injections: I = {} as I, ...requirements: R) {
        abstract class ResolvableImpl extends parent /* implements AbstractResolvable<I> */ {
            protected readonly dependencies: Readonly<IDependencies<I>>;
            constructor(...args: any[]) {
                super(...args);
                this.dependencies = resolveFor(ResolvableImpl, injections, this, args);
            }
        }

        return resolveRequirements(requirements, ResolvableImpl);
    }

    return ResolvableClassFn;
}
