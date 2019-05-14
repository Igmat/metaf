export type Wrapper = <T>(result: T) => T;
export const Wrapper: Wrapper = res => res;
