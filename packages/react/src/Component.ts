// import { autorun, observe } from 'metaf-observable';
import { AbstractResolvable, IInjections, Resolvable } from 'metaf-resolvable';
// import { context, PromiseCache } from 'metaf-sync';
import React from 'react';
import { IRequirements } from './Resolver';
// import { ISyncDependencies } from './State';

export type Component<I extends IInjections = {}> =
    new <P = {}, S = {}, SS = any>(props: Readonly<P>) => AbstractResolvable</* ISyncDependencies< */I/* > */> & React.Component<P, S, SS>;


export interface IComponent {
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
    <I extends IInjections = {}, R extends IRequirements = []>(injections: I, ...requirements: R): Component<I>;
    /**
     * Resolvable component factory
     * @description creates new class without `dependencies` but with
     * informing `ApplicationRoot` that it should fit specific `requirements`
     * @template R type of requirements' tuple
     * @param requirements dependencies that should exist in code that use this class
     * @returns component class to extend
     */
    <R extends IRequirements = []>(...requirements: R): Component;
}
const ReactComponent = Resolvable(React.Component) as IComponent;

/**
 * @description Component factory
 */
export const Component = (<I extends IInjections = {}, R extends IRequirements = []>(injections: I, ...requirements: R) => {
    class BaseComponent<P> extends ReactComponent(injections, ...requirements)<P> {
        constructor(props: Readonly<P>) {
            super(props);
            // -----------------------------------------------
            // Previous code for suspended and reactive render
            // -----------------------------------------------
            // const originalRender = this.render.bind(this);
            // const rerun = this.forceUpdate.bind(this);
            // const render = autorun(originalRender, {
            //     rerun,
            // });

            // this.render = () => {
            //     try {
            //         return render();
            //     } catch (err) {
            //         if (!(err instanceof PromiseCache)) throw err;

            //         err.resolved
            //             .then(() => rerun(() => context.cache = new WeakMap()))
            //             .catch(innerError => { throw innerError; });

            //         // TODO: think about null return in render
            //         // tslint:disable-next-line: no-null-keyword
            //         return null;
            //     }
            // };

            // return observe(this);
            // -----------------------------------------------
        }
    }

    return BaseComponent;
}) as IComponent;

export type ResolvableComponent<I extends IInjections = {}> = Component;
/**
 * @deprecated please, use `Component` instead
 */
export const ResolvableComponent = Component;
