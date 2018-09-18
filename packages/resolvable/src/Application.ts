import { IDependencies, IInjections } from './AbstractResolvable';
import { ResolveForFunction, Resolver, ResolveRequirementsFunction } from './Resolver';
import { Constructable } from './utils';

const resolver = new Resolver();
const application = {
    resolveFor: resolver.resolveFor,
    resolveRequirements: resolver.resolveRequirements,
    isResolverChanged: false,
};

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
export function resolveFor<I extends IInjections = {}>(
    instance: object,
    classImpl: Constructable,
    injections: I = {} as I,
    args: any[] = [],
): IDependencies<I> {
    return application.resolveFor(instance, classImpl, injections, args);
}

/**
 * // TODO: comment resolveRequirements
 * @description Resolves requirements
 * @template I
 * @param requirements
 * @param classImpl
 * @returns
 */
export function resolveRequirements<I extends { [index: string]: any } = {}>(requirements: I, classImpl: Constructable) {
    return application.resolveRequirements(requirements, classImpl);
}

/**
 * // TODO: comment setResolverFn
 * @description Sets resolver fn
 * @param resolverForImpl
 * @param requirementsResolveImpl
 */
export function setResolverFn(resolverForImpl: ResolveForFunction, requirementsResolveImpl: ResolveRequirementsFunction) {
    if (application.isResolverChanged) throw new Error('Your application is trying to setup resolver more than once!');
    application.resolveFor = resolverForImpl;
    application.resolveRequirements = requirementsResolveImpl;
    application.isResolverChanged = true;
}
