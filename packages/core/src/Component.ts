import { SFC } from './JSX/MetaF';
import { IInjections } from './state/AbstractState';
import { State } from './state/State';

export interface IComponent<P> {
    render: SFC<P>;
}
export function Component<T extends IInjections>(dependencies: T) {
    return class ComponentImpl<P> extends State(dependencies) implements IComponent<P> {
        constructor(public render: SFC<P>) {
            super();
        }
    };
}
