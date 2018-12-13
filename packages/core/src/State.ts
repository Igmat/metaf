import * as MetaFResolvable from 'metaf-resolvable';
import { Observable } from './atom';
import { Synchronous, syncService } from './sync/syncService';

class MetafResolver extends MetaFResolvable.Resolver {
    initialize(obj: MetaFResolvable.Injectable) {
        if (MetaFResolvable.isConstructor(obj)) return syncService(obj);
        if (MetaFResolvable.isCallable(obj)) return obj();
        throw new Error(`Dependency expected to be constructable or callable, but got ${typeof obj}`);

    }
}
const appResolver = new MetafResolver();
MetaFResolvable.setResolverFn(appResolver.resolveFor, appResolver.resolveRequirements);
export type IRequirements = any[];
export type ISyncDependencies<T extends MetaFResolvable.IInjections> = {
    [K in keyof T]: T[K] extends MetaFResolvable.Constructable
    ? new() => Synchronous<InstanceType<T[K]>>
    : T[K];
};
export type State<I extends MetaFResolvable.IInjections = {}> =
    new () => MetaFResolvable.AbstractResolvable<ISyncDependencies<I>>;

export interface IState {
    /**
     * Resolvable component factory
     * @description creates new class with resolved `injections` as `dependencies` and
     * inform `ApplicationRoot` that it should fit specific `requirements`
     * @template I type of injections' dictionary
     * @template R type of requirements' tuple
     * @param injections dependencies that will be used by component directly
     * @param requirements dependencies that should exist in code that use this component
     * @returns react `Component` class to extend
     */
    <I extends MetaFResolvable.IInjections = {}, R extends IRequirements = []>(injections: I, ...requirements: R): State<I>;
    /**
     * Resolvable component factory
     * @description creates new class without `dependencies` but with
     * informing `ApplicationRoot` that it should fit specific `requirements`
     * @template R type of requirements' tuple
     * @param requirements dependencies that should exist in code that use this class
     * @returns component class to extend
     */
    <R extends IRequirements = []>(...requirements: R): State;
}

export const State = MetaFResolvable.Resolvable(Observable) as IState;
