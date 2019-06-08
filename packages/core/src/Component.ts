import { IInjections } from 'metaf-resolvable';
import { createElement } from './JSX/createElement';
import { MetaFChild, MetaFNode } from './JSX/types';
import { IRequirements, State } from './State';

export abstract class AbstractComponent {
    protected readonly tagname: string = '';
    abstract render(props: unknown, ...children: unknown[]): MetaFNode | MetaFChild;
}
export type Component<I extends IInjections = {}> =
    new () => InstanceType<State<I>> & AbstractComponent;
export function Component<I extends IInjections = {}, R extends IRequirements = []>(
    injections?: I,
    ...requirements: R): Component<I> {
    abstract class BaseComponent extends State(injections, ...requirements) {
        protected readonly tagName: string;
        constructor() {
            super();
            const render = this.render.bind(this);
            // TODO: create issue for changing typing for getPrototypeOf
            // tslint:disable-next-line: no-unsafe-any
            this.tagName = Object.getPrototypeOf(this).constructor.name;
            this.render = (props: unknown, ...args: unknown[]) => {
                if (typeof props !== 'object') throw new Error(`Typeof props MUST be "object" but got "${typeof props}"`);
                if (props === null) throw new Error('props MUST be not "null"');

                return createElement(
                    this.tagName,
                    {},
                    createElement(render, props, ...args),
                );
            };
        }
        abstract render(props: unknown, ...children: unknown[]): MetaFNode | MetaFChild;
    }

    // TODO: remove this cast when it'll be possible to return abstract classes
    // tslint:disable-next-line:no-any
    return BaseComponent as any;
}
