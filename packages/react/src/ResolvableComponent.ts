import { AbstractResolvable, IInjections, Resolvable } from 'metaf-resolvable';
import { Component } from 'react';
import { IRequirements } from './Resolver';

export type ResolvableComponent<I extends IInjections> =
    new <P = {}, S = {}, SS = any>(props: Readonly<P>) => AbstractResolvable<I> & Component<P, S, SS>;

export interface IResolvableComponent {
    /**
     * // TODO: comment ResolvableComponent
     * @description Resolvable component
     * @template I
     * @template R
     * @param [injections] dependencies that will be used by class directly
     * @param requirements dependencies that should exist in code that use this class
     * @returns component class to extend
     */
    <I extends IInjections = {}, R extends IRequirements = []>(injections?: I, ...requirements: R): ResolvableComponent<I>;
    /**
     * // TODO: comment ResolvableComponent
     * @description Resolvable component
     * @template I
     * @template R
     * @param requirements dependencies that should exist in code that use this class
     * @returns component class to extend
     */
    <I extends IInjections = {}, R extends IRequirements = []>(...requirements: R): ResolvableComponent<I>;
}
// tslint:disable-next-line:variable-name
export const ResolvableComponent = Resolvable(Component) as IResolvableComponent;
