import { Initiable, syncService } from '../sync/syncService';
import { AbstractState } from './AbstractState';

export class Application {
    private injectionRoot = new WeakMap<Initiable<any>, any>();

    inject<T extends Initiable<any>>(constructor: T): InstanceType<T> {
        if (!this.injectionRoot.has(constructor)) {
            this.injectionRoot.set(
                constructor,
                constructor.prototype instanceof AbstractState
                    ? new constructor()
                    : syncService(constructor));
        }

        return this.injectionRoot.get(constructor);
    }
}
