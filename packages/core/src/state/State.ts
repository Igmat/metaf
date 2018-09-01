import { Initiable } from '../sync/syncService';
import { AbstractState, IDependencies, IInjections, InjectorSymbol } from './AbstractState';

export function State<D extends IInjections>(dependencies: D) {
    let resolvedDependencies: IDependencies<D>;

    return class StateImpl extends AbstractState<D> {
        // TODO: return correct access level when TS team fix this https://github.com/Microsoft/TypeScript/issues/17293
        /* protected */
        static [InjectorSymbol]: <T extends Initiable<any>>(constructor: T) => InstanceType<T>;
        constructor() {
            if (!resolvedDependencies) {
                const inject = AbstractState[InjectorSymbol];
                resolvedDependencies = {} as IDependencies<D>;
                Object.keys(dependencies)
                    .forEach(stateName =>
                        resolvedDependencies[stateName] = inject(dependencies[stateName]));
            }
            super(resolvedDependencies);

            return new Proxy(this, {
                set(target, p, value) {
                    // TODO: wrap into reactive ATOM
                    (target as any)[p] = value;

                    return true;
                },
            });
        }
    };
}
