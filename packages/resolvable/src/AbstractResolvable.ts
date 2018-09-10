import { Callable, Constructable } from './utils';

export type Injectable = Constructable | Callable;
export type Injected<T extends Injectable> = T extends Constructable
    ? InstanceType<T>
    : T extends Callable
        ? ReturnType<T>
        : never;
export interface IInjections {
    [index: string]: Injectable;
}

export type IDependencies<T extends IInjections> = {
    [K in keyof T]: Injected<T[K]>
};
export abstract class AbstractResolvable<I extends IInjections> {
    constructor(protected readonly dependencies: Readonly<IDependencies<I>>) {
    }
}
