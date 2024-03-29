import { IDependencies, IInjections } from './AbstractResolvable';
import { ResolveForFunction, Resolver, ResolveRequirementsFunction } from './Resolver';
import { AbstractClass, AbstractFn } from './utils';

const resolver = new Resolver();
const application = {
    isResolverChanged: false,
    resolveFor: resolver.resolveFor.bind(resolver),
    resolveRequirements: resolver.resolveRequirements.bind(resolver),
};

/**
 * @internal
 */
export function resolveFor<I extends IInjections = {}>(
    classImpl: AbstractClass | AbstractFn,
    injections: I = {} as I,
    instance?: object,
    args?: unknown[],
): IDependencies<I> {
    return application.resolveFor(classImpl, injections, instance, args);
}

/**
 * @internal
 */
export function resolveRequirements<I extends any[], C extends object>(requirements: I, classImpl: C) {
    return application.resolveRequirements(requirements, classImpl);
}

/**
 * This function should be used **only** once and **only** for setting another resolution mechanism
 * provided by some particular `Resolver` implementation for specific environment (e.g. for `react` app)
 * @description Sets function that will be used by `Resolvable` as `resolveFor` and `resolveRequirements` global helpers
 * @param resolveForImpl actual implementation of `resolveFor` function to replace default one
 * @param requirementsResolveImpl actual implementation of `resolveRequirements` function to replace default one
 */
export function setResolverFn(resolveForImpl: ResolveForFunction, requirementsResolveImpl: ResolveRequirementsFunction) {
    if (application.isResolverChanged) throw new Error('Your application is trying to setup resolver more than once!');
    application.resolveFor = resolveForImpl;
    application.resolveRequirements = requirementsResolveImpl;
    application.isResolverChanged = true;
}
