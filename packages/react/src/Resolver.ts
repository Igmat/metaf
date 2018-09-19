import { Constructable, IDependencies, IInjections, IOverrideResult, Resolver, setResolverFn } from 'metaf-resolvable';
import { ReactNode } from 'react';

export type HOC = (app: ReactNode) => JSX.Element;

/**
 * // TODO: comment IRequirements
 * @description requirements
 */
export type IRequirements = HOC[];
const requirementsOverride = Symbol('Requirements Override');

/**
 * // TODO: comment IRequirementsOverride
 * @description requirements override
 * @template T
 * @template R
 */
export interface IRequirementsOverride<T extends HOC = any, R extends T = any> {
    [requirementsOverride]: [T, R];
}

/**
 * // TODO: comment overrideRequirement
 * @description Overrides requirement
 * @template T
 * @template R
 * @param key
 * @param value
 * @returns requirement
 */
export function overrideRequirement<T extends HOC, R extends T>(key: T, value: R): IRequirementsOverride<T, R> {
    return { [requirementsOverride]: [key, value] };
}
/**
 * @internal
 */
export class ReactResolver extends Resolver {
    private requirements = new Map<HOC, HOC>();
    private requirementsArray: HOC[] = [];
    private requirementsSubscribers: ((requirements: HOC[]) => void)[] = [];
    setOverrides(overrides: IOverrideResult[]) {
        overrides.forEach(this.setOverride);
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
    resolveRequirements<I extends IRequirements = []>(requirements: I, classImpl: Constructable) {
        let isRequirementsUpdated = false;
        requirements
            .forEach(requirement => {
                if (this.requirements.has(requirement)) return;
                this.requirements.set(requirement, requirement);
                this.requirementsArray.push(requirement);
                isRequirementsUpdated = true;
            });
        if (isRequirementsUpdated) this.requirementsSubscribers.forEach(subscriber => subscriber(this.requirementsArray));
    }
    subscribeForRequirements(subscriber: (requirements: HOC[]) => void) {
        this.requirementsSubscribers.push(subscriber);
        // we also need to call subscriber with already existing requirements
        subscriber(this.requirementsArray);
    }
}

/**
 * @internal
 */
export const resolver = new ReactResolver();

function resolveRequirements<I extends IRequirements = []>(requirements: I, classImpl: Constructable): void {
    resolver.resolveRequirements(requirements, classImpl);
}
function resolveFor<I extends IInjections = {}>(
    instance: object,
    classImpl: Constructable,
    injections?: I,
    args?: any[]): IDependencies<I> {
    return resolver.resolveFor(instance, classImpl, injections, args);
}
setResolverFn(resolveFor, resolveRequirements);
