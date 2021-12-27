import { ComponentType } from "react";

export function ObserveProvider() {
    return {
        observer<T extends ComponentType>(component: T): T {
            return component;
        },
        observe<T>(obj: T): T {
            return obj;
        }
    }
}
