import { Observable } from 'metaf-observable';
import { AbstractResolvable, /* Constructable, */ IInjections, Resolvable } from 'metaf-resolvable';
//  import { Synchronous } from 'metaf-sync';

class BaseState extends Observable {
}

export type IRequirements = any[];
// export type ISyncDependencies<T extends IInjections> = {
//     [K in keyof T]: T[K] extends Constructable
//     ? new () => Synchronous<InstanceType<T[K]>>
//     : T[K];
// };
export type State<I extends IInjections = {}> =
    new () => AbstractResolvable</* ISyncDependencies< */I/* > */>;

export interface IState {
    /**
     * Resolvable state factory
     * @description creates new class with resolved `injections` as `dependencies` and
     * inform `ApplicationRoot` that it should fit specific `requirements`
     * @template I type of injections' dictionary
     * @template R type of requirements' tuple
     * @param injections dependencies that will be used by component directly
     * @param requirements dependencies that should exist in code that use this component
     * @returns state class to extend
     */
    <I extends IInjections = {}, R extends IRequirements = []>(injections: I, ...requirements: R): State<I>;
    /**
     * Resolvable state factory
     * @description creates new class without `dependencies` but with
     * informing `ApplicationRoot` that it should fit specific `requirements`
     * @template R type of requirements' tuple
     * @param requirements dependencies that should exist in code that use this class
     * @returns state class to extend
     */
    <R extends IRequirements = []>(...requirements: R): State;
}

export const State = Resolvable(BaseState) as IState;
