import { AbstractResolvable, IInjections, Resolvable } from 'metaf-resolvable';
import { Component } from 'react';
import { IRequirements } from './Resolver';

export type ResolvableComponent<I extends IInjections> =
    new <P = {}, S = {}, SS = any>(props: Readonly<P>) => AbstractResolvable<I> & Component<P, S, SS>;
export function ResolvableComponent<I extends IInjections = {}, R extends IRequirements = {}>(
    injections: I = {} as I,
    requirements: R = {} as R): ResolvableComponent<I> {
    return Resolvable(injections, requirements, Component) as ResolvableComponent<I>;
}
