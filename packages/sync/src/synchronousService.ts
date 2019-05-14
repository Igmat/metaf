import { Callable, Constructable, isConstructor } from 'metaf-resolvable';
import { synchronous } from './synchronous';
export function synchronousService<I extends object>(serviceConstructor: Constructable<[], I> | Callable<I>) {
    const instance = isConstructor(serviceConstructor)
        ? new serviceConstructor()
        : serviceConstructor();

    return synchronous(instance);
}
