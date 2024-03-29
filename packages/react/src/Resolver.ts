// import { observe } from 'metaf-observable';
import * as MetafResolvable from 'metaf-resolvable';
import { Injectable, Injected, override } from 'metaf-resolvable';
// import { synchronous } from 'metaf-sync';
import { ReactNode } from 'react';

export type HOC = (app: ReactNode) => JSX.Element;

/**
 * @description requirements for host application
 */
export type IRequirements = HOC[];
const requirementsOverride = Symbol('Requirements Override');

/**
 * Interface that forces users to make type safe overrides
 * @description requirements override
 * @template T type of dependency that have to be overwritten
 * @template R
 */
export interface IRequirementsOverride<T extends HOC = HOC, R extends T = T> {
    [requirementsOverride]: [T, R];
}

/**
 * Function that meant to be used as only way for specifying requirements overrides
 * it's designed to provide best possible type safety, but until something like this:
 * https://github.com/Microsoft/TypeScript/issues/13890
 * will land to TSX type inference, it only forces users to replace requirement HOC
 * by another HOC, which, obviously, could ignore initial invariants,
 * but unfortunately there are no better options for now
 * @description creates a `[key, value]` pair describing requirement override
 * @template T type of requirement key that has to be overwritten
 * @template R type of value that will be used instead of original requirement
 * @param key actual key that has to be overwritten
 * @param value value that will be passed as requirement for this `key`
 * @returns object with symbol property which point to `[key, value]` pair
 */
export function overrideRequirement<T extends HOC, R extends T>(key: T, value: R): IRequirementsOverride<T, R> {
    return { [requirementsOverride]: [key, value] };
}
/**
 * @internal
 */
export class ReactResolver extends MetafResolvable.Resolver {
    private requirements = new Map<HOC, HOC>();
    private requirementsArray: HOC[] = [];
    private requirementsSubscribers: ((requirements: HOC[]) => void)[] = [];
    setOverrides(overrides: MetafResolvable.IOverrideResult[]) {
        overrides.forEach(this.setOverride.bind(this));
    }
    setRequirementsOverrides(overrides: IRequirementsOverride[]) {
        overrides.forEach(requirementPair => {
            const [key, value] = requirementPair[requirementsOverride];
            const prevValue = this.requirements.get(key);
            if (prevValue) {
                const index = this.requirementsArray.indexOf(value);
                this.requirementsArray.splice(index, 1);
            }
            if (this.requirementsArray.indexOf(value) === -1) {
                this.requirementsArray.push(value);
            }
            this.requirements.set(key, value);
        });
    }
    resolveRequirements<C extends object = object>(requirements: IRequirements, classImpl: C) {
        let isRequirementsUpdated = false;
        requirements
            .forEach(requirement => {
                if (this.requirements.has(requirement)) return;
                this.requirements.set(requirement, requirement);
                this.requirementsArray.push(requirement);
                isRequirementsUpdated = true;
            });
        if (isRequirementsUpdated) this.requirementsSubscribers.forEach(subscriber => subscriber(this.requirementsArray));

        return super.resolveRequirements(requirements, classImpl);
    }
    subscribeForRequirements(subscriber: (requirements: HOC[]) => void) {
        this.requirementsSubscribers.push(subscriber);

        return this.requirementsArray;
    }
    initialize(obj: MetafResolvable.Injectable) {
        const result = super.initialize(obj);

        return (typeof result === 'object' && result !== null)
            ? /* synchronous */(/* observe */(result))
            : result;
    }
}

/**
 * @internal
 */
export const resolver = new ReactResolver();

/**
 * Entry point for resolving requirements for particular `ResolvableComponent`,
 * but also could be used as a HOC for any other component including `SFC`s
 * @description resolves `requirements` for `componentImpl` and applies them to `ApplicationRoot`
 * @template R type of `requirements` tuple
 * @template C type of `componentImpl`
 * @param requirements tuple of specific requirements that should be met by hosting application
 * @param componentImpl particular resolvable class implementation
 * @returns exactly same `componentImpl`, but with resolved requirements
 */
export function resolveRequirements<
    R extends IRequirements = [],
    C extends object = {}>(requirements: R, componentImpl: C) {
    return resolver.resolveRequirements(requirements, componentImpl);
}
function resolveFor<I extends MetafResolvable.IInjections = {}>(
    classImpl: MetafResolvable.AbstractClass | MetafResolvable.AbstractFn,
    injections: I = {} as I,
    instance?: object,
    args?: any[]): MetafResolvable.IDependencies<I> {
    return resolver.resolveFor(classImpl, injections, instance, args);
}
MetafResolvable.setResolverFn(resolveFor, resolveRequirements);

export type IOverridesHelper = {
    set<T extends Injectable = Injectable>(key: T, value: Injected<T>): IOverridesHelper;
}
export const overrides: IOverridesHelper = {
    set<T extends Injectable = Injectable>(key: T, value: Injected<T>) {
        resolver.setOverrides([override(key, value)]);

        return overrides;
    }
}
