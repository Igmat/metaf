// tslint:disable:prefer-function-over-method
import { IDependencies, IInjections, Injectable, Injected } from './AbstractResolvable';
import { Callable, Constructable } from './utils';

function isConstructor(obj: Injectable): obj is Constructable {
    return obj.hasOwnProperty('prototype') && !!obj.prototype.constructor.name;
}
function isCallable(obj: Injectable): obj is Callable {
    return typeof obj === 'function';
}
export type ResolveForFunction = <I extends IInjections = {}>(
    instance: object,
    classImpl: Constructable,
    injections?: I,
    args?: any[],
) => IDependencies<I>;

export type ResolveRequirementsFunction = <R extends any[] = [], C extends object = any>(requirements: R, classImpl: C) => C;

// we are using private symbol in order to force users work with override function
// so override always type compatible with original value
const overrideSymbol = Symbol('Overrides');

/**
 * // TODO: comment IOverrideResult
 * @description override result
 * @template T
 */
export interface IOverrideResult<T extends Injectable = any> {
    [overrideSymbol]: [T, Injected<T>];
}

/**
 * // TODO: comment override
 * @description Overrides this
 * @template T
 * @param key
 * @param value
 * @returns this
 */
export function override<T extends Injectable = any>(key: T, value: Injected<T>): IOverrideResult<T> {
    return {
        [overrideSymbol]: [key, value],
    };
}

/**
 * // TODO: comment Resolver
 * @description Resolver
 */
export class Resolver {

    /**
     * // TODO: comment injectionRoot
     * @description Injection root of resolver
     */
    protected injectionRoot: WeakMap<Injectable, any>;

    /**
     * // TODO: comment implementations
     * @description Implementations  of resolver
     */
    protected implementations: WeakMap<Constructable, any>;

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
     * // TODO: comment initialize
     * @description Initializes resolver
     * @param obj
     * @returns
     */
    initialize(obj: Injectable) {
        // this function is pure, but it's possible that ancestors may need
        // another solution for initializing instacnes, because of framework
        // requirements, conventions and best practices
        if (isConstructor(obj)) return new obj();
        if (isCallable(obj)) return obj();
        throw new Error(`Dependency expected to be constructable or callable, but got ${typeof obj}`);
    }

    /**
     * // TODO: comment resolveRequirements
     * @description Resolves requirements
     * @template R
     * @template C
     * @param requirements
     * @param classImpl
     * @returns implementation
     */
    resolveRequirements<R extends any[], C extends object>(requirements: R, classImpl: C) {
        // default implementation does nothing, since only Resolver for specific framework
        // knows how to apply requirements to particular environment
        return classImpl;
    }

    /**
     * // TODO: comment resolveFor
     * @description Resolves for
     * @template I
     * @param instance
     * @param classImpl
     * @param [injections]
     * @param [args]
     * @returns for
     */
    resolveFor<I extends IInjections = {}>(
        instance: object,
        classImpl: Constructable,
        injections: I = {} as I,
        args: any[] = [],
    ): IDependencies<I> {
        if (this.implementations.has(classImpl)) return this.implementations.get(classImpl);

        const resolvedDependencies = {} as IDependencies<I>;
        Object.keys(injections)
            .forEach(stateName =>
                resolvedDependencies[stateName] = this.inject(injections[stateName]) as Injected<I[string]>);
        this.implementations.set(classImpl, resolvedDependencies);

        return resolvedDependencies;
    }

    /**
     * // TODO: comment inject
     * @description Injects resolver
     * @template T
     * @param injectionKey
     * @returns inject
     */
    protected inject<T extends Injectable>(injectionKey: T): Injected<T> {
        if (!this.injectionRoot.has(injectionKey)) {
            this.injectionRoot.set(
                injectionKey,
                this.initialize(injectionKey));
        }

        return this.injectionRoot.get(injectionKey);
    }

    /**
     * // TODO: comment setOverride
     * @description Sets override
     * @template T
     * @param overridePair
     */
    protected setOverride<T extends Injectable = any>(overridePair: IOverrideResult<T>) {
        const [key, value] = overridePair[overrideSymbol];
        this.injectionRoot.set(key, value);
    }
}
