import { Callable, Constructable, Injectable } from './utils';

export type Injected<T extends Injectable> = T extends Constructable
    ? InstanceType<T>
    : T extends Callable
    ? ReturnType<T>
    : never;

/**
 * Injections interface
 * @description it's a dictionary that contains constructors/getters
 * for dependencies initialization
 */
export interface IInjections {
    [index: string]: Injectable;
}

/**
 * Dependencies interface
 * @description it's a dictionary of resolved and initialized instances for each dependency
 */
export type IDependencies<T extends IInjections> = {
    [K in keyof T]: Injected<T[K]>
};

/**
 * AbstractResolvable class
 * @description this class doesn't meant to be used directly
 * its main purpose is correct type inferring for dependencies
 * and providing strict contract for further usage
 * @template I type of dependencies' dictionary
 */
export abstract class AbstractResolvable<I extends IInjections> {

    /**
     * Dictionary of dependencies for this class
     * @description contains resolved and initialized instances for each dependency
     */
    protected readonly dependencies: Readonly<IDependencies<I>>;

    /**
     * Creates an instance of abstract resolvable.
     * @param dependencies dependencies dictionary that should be injected to resolvable class
     */
    constructor(dependencies: Readonly<IDependencies<I>>) {
        this.dependencies = dependencies;
    }
}
