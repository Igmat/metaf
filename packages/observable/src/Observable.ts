import { ITransaction } from './mutations';
import { observe } from './observe';

export class Observable {
    constructor(onSet?: (tx: ITransaction) => void) {
        return observe(this, onSet);
    }
}
