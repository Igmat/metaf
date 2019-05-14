import { IDirtyAtom } from './atoms';
import { recalculate } from './calculations';
export interface IAutorunOptions {
    rerun?(): void;
    clear?(): void;
}
let toRun: (() => void)[] = [];
export function autorun<T>(observableFn: () => T, { rerun, clear }: IAutorunOptions) {
    const exec = clear
        ? () => {
            clear();

            return recalculate(atom, observableFn);
        }
        : () => recalculate(atom, observableFn);
    const atom: IDirtyAtom<T> = {
        dependencies: [],
        dependents: [],
        get isDirty() {
            return true as true;
        },
        set isDirty(val) {
            if (toRun.length === 0) {
                setTimeout(() => {
                    toRun.forEach(execFn => execFn());
                    toRun = [];
                });
            }
            if (val && toRun.indexOf(exec) === -1) {
                toRun.push(rerun || exec);
            }
        },
        source: observableFn,
        p: '',
    };

    return exec;
}
