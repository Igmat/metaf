export type Constructable<ARGS extends any[] = any, I = unknown> = new (...args: ARGS) => I;
export type Callable<R = unknown> = () => R;
