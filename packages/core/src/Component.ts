import { SFC } from './JSX/MetaF';

export interface IComponent<P> {
    render: SFC<P>;
}
export class Component<P> implements IComponent<P> {
        constructor(public render: SFC<P>) {
        }
}
