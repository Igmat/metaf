import { AbstractResolvable, IDependencies, IInjections } from './AbstractResolvable';
import { resolveFor, resolveRequirements } from './Application';
import { Constructable } from './utils';

export type Resolvable<I extends IInjections, P> =
    P extends new (...args: infer ARGS) => infer R
    ? new (...args: ARGS) => AbstractResolvable<I> & R
    : new () => AbstractResolvable<I>;

export function Resolvable<
    I extends IInjections = {},
    R extends { [index: string]: any } = {},
    P extends Constructable = new () => unknown>(
    injections: I = {} as I,
    requirements: R = {} as R,
    parent = Object.prototype.constructor as P): Resolvable<I, P> {
    class ResolvableImpl extends parent.prototype.constructor {
        protected readonly dependencies: Readonly<IDependencies<I>>;
        constructor(...args: any[]) {
            super(...args);
            this.dependencies = resolveFor(this, ResolvableImpl, injections, args);
        }
    }
    resolveRequirements(requirements, ResolvableImpl);

    return ResolvableImpl as any;
}
