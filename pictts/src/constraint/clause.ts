import { KeyValueMap } from '../keyvalue/keyvalue';
import { ForceBoolean } from './forceBool';

export abstract class Clause {
    protected not: boolean;

    constructor(not: boolean) {
        this.not = not;
    }

    abstract operate(record: KeyValueMap): ForceBoolean;
}
