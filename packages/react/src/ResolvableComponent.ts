import { AbstractResolvable, IInjections, Resolvable } from 'metaf-resolvable';
import { Component } from 'react';
import { IRequirements } from './Resolver';

export type ResolvableComponent<I extends IInjections = {}> =
    new <P = {}, S = {}, SS = any>(props: Readonly<P>) => AbstractResolvable<I> & Component<P, S, SS>;

export interface IResolvableComponent {
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
    <I extends IInjections = {}, R extends IRequirements = []>(injections: I, ...requirements: R): ResolvableComponent<I>;
    /**
     * Resolvable component factory
     * @description creates new class without `dependencies` but with
     * informing `ApplicationRoot` that it should fit specific `requirements`
     * @template R type of requirements' tuple
     * @param requirements dependencies that should exist in code that use this class
     * @returns component class to extend
     */
    <R extends IRequirements = []>(...requirements: R): ResolvableComponent;
}
/**
 * @description Resolvable component factory
 */
export const ResolvableComponent = Resolvable(Component) as IResolvableComponent;
