import React, { ReactNode } from 'react';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const defineRequirement = <T extends {children?: ReactNode}>(Requirement: React.ComponentType<T>, props?: Omit<T, 'children'>) =>
    (app: ReactNode) =>
        <Requirement { ...props }>{ app }</Requirement>;
