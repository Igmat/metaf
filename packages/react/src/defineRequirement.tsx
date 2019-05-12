import React, { ReactNode } from 'react';

/**
 * Helper function for defining requirements
 * @description Creates requirement from particular component and props that will be passed to it
 * @template T type of props for this `Requirement` component
 * @param Requirement component type that will be used as HOC for wrapping `ApplicationRoot`
 * @param [props] actual props that have to be passed to `Requirement`
 * @returns requirement that could be easily used by `ResolvableComponent` or `withRequirements` HOC
 */
export function defineRequirement<T extends {}>(Requirement: React.ComponentType<T>, props?: Pick<T, Exclude<keyof T, 'children'>>) {
    return (app: ReactNode) =>
        <Requirement {...props}>{app}</Requirement>;
}
