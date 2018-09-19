import { AbstractResolvable, IInjections, Resolvable } from 'metaf-resolvable';
import { Component } from 'react';
import { IRequirements } from './Resolver';

export type ResolvableComponent<I extends IInjections> =
    new <P = {}, S = {}, SS = any>(props: Readonly<P>) => AbstractResolvable<I> & Component<P, S, SS>;

/**
 * // TODO: comment ResolvableComponent
 * @description Resolvable component
 * @template I
 * @template R
 * @param [injections]
 * @param requirements
 * @returns component
 */
export function ResolvableComponent<I extends IInjections = {}, R extends IRequirements = []>(
    injections: I = {} as I,
    ...requirements: R): ResolvableComponent<I> {
    return Resolvable(injections, Component, ...requirements) as ResolvableComponent<I>;
}
