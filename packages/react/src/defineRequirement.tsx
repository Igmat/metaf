import React, { ReactNode } from 'react';

export const defineRequirement = <T extends {}>(Requirement: React.ComponentType<T>, props?: Pick<T, Exclude<keyof T, 'children'>>) =>
    (app: ReactNode) =>
        <Requirement { ...props }>{ app }</Requirement>;
