import { Key, Value } from '../keyvalue';
import { ForceBoolean } from './forceBool';

export abstract class Clause {
    protected not: boolean;

    constructor(not: boolean) {
        this.not = not;
    }

    abstract ioperate(record: Map<Key, Value>): ForceBoolean;
}
