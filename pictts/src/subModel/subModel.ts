import { Key } from '../keyvalue';

export class SubModel {
    readonly keys: Key[];
    readonly order: number;
    constructor(keys: Key[], order: number) {
        this.keys = keys;
        this.order = order;
    }
}
