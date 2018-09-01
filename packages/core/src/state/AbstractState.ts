import { Initiable, Synchronous } from '../sync/syncService';

export const InjectorSymbol = Symbol('Injector');

export interface IInjections {
    [index: string]: Initiable<any>;
}

export type IDependencies<T extends IInjections> = {
    [K in keyof T]: T[K] extends Initiable<AbstractState<any>>
        ? InstanceType<T[K]>
        : Synchronous<InstanceType<T[K]>>;
};

export abstract class AbstractState<I extends IInjections> {

    static [InjectorSymbol]: <T extends Initiable<any>>(constructor: T) => InstanceType<T>;
    // TODO: return correct access level when TS team fix this https://github.com/Microsoft/TypeScript/issues/17293
    constructor(/*protected*/ readonly dependencies: IDependencies<I>) {
    }
}
