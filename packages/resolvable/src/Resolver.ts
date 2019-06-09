// tslint:disable:prefer-function-over-method
import { IDependencies, IInjections, Injected } from './AbstractResolvable';
import { Constructable, Injectable, isCallable, isConstructor } from './utils';

export type ResolveForFunction = <I extends IInjections = {}>(
    instance: object,
    classImpl: Constructable,
    injections?: I,
    args?: unknown[],
) => IDependencies<I>;

export type ResolveRequirementsFunction = <R extends any[] = any[], C extends object = object>(requirements: R, classImpl: C) => C;

// we are using private symbol in order to force users work with override function
// so override always type compatible with original value
const overrideSymbol = Symbol('Overrides');

/**
 * Interface that forces users to make type safe overrides
 * @description override result
 * @template T type of dependency that have to be overwritten
 */
export interface IOverrideResult<T extends Injectable = Injectable> {
    [overrideSymbol]: [T, Injected<T>];
}

/**
 * Function that meant to be used as only way for specifying overrides
 * @description creates a `[key, value]` pair describing override
 * @template T type of dependency key that has to be overwritten
 * @param key actual key that has to be overwritten
 * @param value value that will be passed as dependency for this `key`
 * @returns object with symbol property which point to `[key, value]` pair
 */
export function override<T extends Injectable = Injectable>(key: T, value: Injected<T>): IOverrideResult<T> {
    return {
        [overrideSymbol]: [key, value],
    };
}

/**
 * Class that is responsible for resolving dependencies and requirements
 * @description contains all resolved dependencies, resolvable class implementations
 * and methods that used by `Resolvable` factories in order to create properly resolved
 * classes with dependencies
 * > **NOTE:** it also meant to be extended in order to provide first-class support
 * for some particular frameworks e.g. `react`
 */
export class Resolver {

    /**
     * WeakMap where `key` points to resolved and initialized and resolved `dependency`
     * @description map of all resolved dependencies
     */
    protected injectionRoot: WeakMap<Injectable, unknown>;

    /**
     * WeakMap where `key` is resolvable class and `value` is object with resolved `dependencies`
     * @description resolved dependencies for resolvable class implementations
     */
    protected implementations: WeakMap<Constructable, unknown>;

    /**
     * Creates an instance of resolver.
     * @param [overrides]
     */
    constructor(overrides: IOverrideResult[] = []) {
        this.injectionRoot = new WeakMap(overrides.map(overridePair => overridePair[overrideSymbol]));
        this.implementations = new WeakMap();
        // we want these function to have correct `this` context,
        // but can't use arrow functions because it breaks normal inheritance flow
        this.inject = this.inject.bind(this);
        this.resolveFor = this.resolveFor.bind(this);
        this.resolveRequirements = this.resolveRequirements.bind(this);
        this.initialize = this.initialize.bind(this);
        this.setOverride = this.setOverride.bind(this);
    }

    /**
     * Entry point for resolving requirements for particular resolvable class
     * @description resolves `requirements` for `classImpl` and applies them to `ApplicationRoot`
     * > **NOTE:** default implementation does nothing, since only Resolver for specific framework
     * knows how to apply requirements to particular environment
     * @template R type of `requirements` tuple
     * @template C type of `classImpl` constructor
     * @param requirements tuple of specific requirements that should be met by hosting application
     * @param classImpl particular resolvable class implementation
     * @returns `classImpl` or something with exactly same interface
     */
    resolveRequirements<R extends any[], C extends object>(requirements: R, classImpl: C) {
        return classImpl;
    }

    /**
     * Entry point for resolving dependencies of particular instance
     * @description resolves `injections` for `instance` of `classImpl` resolvable class
     * @template I type of `injections` dictionary
     * @param instance particular class instance
     * @param classImpl class constructor that was used for creating this instance
     * @param [injections] dictionary of dependencies that should be resolved and initialized
     * @param [args] arguments that were passed to constructor function for creating `instance`
     * @returns dictionary of resolved and initialized dependencies
     */
    resolveFor<I extends IInjections = {}>(
        instance: object,
        classImpl: Constructable,
        injections: I = {} as I,
        args: unknown[] = [],
    ): IDependencies<I> {
        if (this.implementations.has(classImpl)) return this.implementations.get(classImpl) as IDependencies<I>;

        const resolvedDependencies = {} as IDependencies<I>;
        // TODO: remove this cast once Object.keys typings would be fixed
        (Object.keys(injections) as (keyof I)[])
            .forEach(injectionName =>
                resolvedDependencies[injectionName] = this.inject(injections[injectionName]) as Injected<I[string]>);
        this.implementations.set(classImpl, resolvedDependencies);

        return resolvedDependencies;
    }

    /**
     * This method is used internally to properly initialize dependency
     * @description initializes injectable `obj`
     * > **NOTE:** this function is pure, but it's possible that ancestors may need
     * another solution for initializing instacnes, because of framework
     * requirements, conventions and best practices
     * @param obj dependency that has to be initialized
     * @returns initialized dependency
     */
    protected initialize<T extends Injectable = Injectable>(obj: T) {
        if (isConstructor(obj)) return new obj();
        if (isCallable(obj)) return obj();
        throw new Error(`Dependency expected to be constructable or callable, but got ${typeof obj}`);
    }

    /**
     * This method is used to inject resolved `dependency` for `injectionKey`
     * @description Injects resolver
     * @template T type of `injectionKey` that maps to type of `dependency` value
     * @param injectionKey actual key of `dependency`
     * @returns resolved `dependency` instance
     */
    protected inject<T extends Injectable = Injectable>(injectionKey: T): Injected<T> {
        if (!this.injectionRoot.has(injectionKey)) {
            this.injectionRoot.set(
                injectionKey,
                this.initialize(injectionKey));
        }

        return this.injectionRoot.get(injectionKey) as Injected<T>;
    }

    /**
     * This method works with result of `override` helper function
     * @description Sets override for particular `injectionKey`
     * @template T type of `injectionKey` that maps to type of `dependency` value
     * @param overridePair actual `[key, value]` pair retrieved from override helper
     */
    protected setOverride<T extends Injectable = Injectable>(overridePair: IOverrideResult<T>) {
        const [key, value] = overridePair[overrideSymbol];
        this.injectionRoot.set(key, value);
    }
}
