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
    class BaseComponent extends State(injections, ...requirements) {
        protected readonly tagName: string;
        constructor() {
            super();
            const render = this.render.bind(this);
            this.tagName = Object.getPrototypeOf(this).constructor.name;
            this.render = (props: unknown, ...children: unknown[]) =>
                BaseComponent.prototype.render.call(this, {}, render(props, children));
        }
        render(props: unknown, ...children: unknown[]): MetaFNode | MetaFChild {
            // tslint:disable-next-line:no-any
            return createElement(this.tagName as any, props, ...children);
        }
    }

    // tslint:disable-next-line:no-any
    return BaseComponent as any;
}
