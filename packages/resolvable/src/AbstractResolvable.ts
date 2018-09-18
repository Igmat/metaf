import { Callable, Constructable } from './utils';

export type Injectable = Constructable | Callable;
export type Injected<T extends Injectable> = T extends Constructable
    ? InstanceType<T>
    : T extends Callable
        ? ReturnType<T>
        : never;

/**
 * // TODO: comment IInjections
 * @description injections
 */
export interface IInjections {
    [index: string]: Injectable;
}

/**
 * // TODO: comment IDependencies
 * @description dependencies
 */
export type IDependencies<T extends IInjections> = {
    [K in keyof T]: Injected<T[K]>
};

/**
 * // TODO: comment AbstractResolvable
 * @description Abstract resolvable
 * @template I
 */
export abstract class AbstractResolvable<I extends IInjections> {

    /**
     * // TODO: comment dependencies
     * @description Dependencies of abstract resolvable
     */
    protected readonly dependencies: Readonly<IDependencies<I>>;

    /**
     * Creates an instance of abstract resolvable.
     * @param dependencies
     */
    constructor(dependencies: Readonly<IDependencies<I>>) {
        this.dependencies = dependencies;
    }
}
