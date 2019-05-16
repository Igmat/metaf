import { ITransaction } from './mutations';
import { observeObj } from './observe';

export class Observable {
    constructor(onSet?: (tx: ITransaction) => void) {
        return observeObj(this, onSet);
    }
}
