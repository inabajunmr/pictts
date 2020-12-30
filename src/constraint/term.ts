import { Key, Value } from '../keyvalue';
import { Clause } from './constraint';

export class Term extends Clause {
    private readonly left: Key;
    private readonly rightValues: Value[];
    private readonly rightKeys: Key[];
    private readonly relationOperator: Relation;

    constructor(
        left: Key,
        rightValues: Value[],
        rightKeys: Key[],
        relation: Relation
    ) {
        super(true);
        this.left = left;
        this.rightValues = rightValues;
        this.rightKeys = rightKeys;
        this.relationOperator = relation;
    }

    operate(record: Map<Key, Value>): boolean {
        switch (this.relationOperator) {
            case '=': {
                const l = this.getLeftValue(record);
                const r = this.getRightValue(record);

                if (l === undefined || r === undefined) {
                    return true;
                }

                return l === r;
            }
            case '<>': {
                const l = this.getLeftValue(record);
                const r = this.getRightValue(record);

                if (l === undefined || r === undefined) {
                    return true;
                }

                return l !== r;
            }
            case '>': {
                const l = this.getLeftValue(record);
                const r = this.getRightValue(record);

                if (l === undefined || r === undefined) {
                    return true;
                }

                return l > r;
            }
            case '>=': {
                const l = this.getLeftValue(record);
                const r = this.getRightValue(record);

                if (l === undefined || r === undefined) {
                    return true;
                }

                return l >= r;
            }
            case '<': {
                const l = this.getLeftValue(record);
                const r = this.getRightValue(record);

                if (l === undefined || r === undefined) {
                    return true;
                }

                return l < r;
            }
            case '<=': {
                const l = this.getLeftValue(record);
                const r = this.getRightValue(record);

                if (l === undefined || r === undefined) {
                    return true;
                }

                return l <= r;
            }
            case 'LIKE': {
                const l = this.getLeftValue(record);
                const pattern = this.rightValues[0];

                if (l === undefined) {
                    return true;
                }

                // TODO PICT pattern is not same as js regex
                return l.match(pattern.value) !== null;
            }
            case 'IN': {
                const l = this.getLeftValue(record);

                if (l === undefined) {
                    return true;
                }

                return (
                    this.rightValues.filter((v) => v.value === l).length !== 0
                );
            }
        }
    }

    getLeftValue(record: Map<Key, Value>): string | undefined {
        return record.get(this.left)?.value;
    }

    getRightValue(record: Map<Key, Value>): string | undefined {
        return this.rightValues.length !== 0
            ? this.rightValues[0].value
            : record.get(this.rightKeys[0] as Key)?.value;
    }
}

type Relation = '=' | '<>' | '>' | '>=' | '<' | '<=' | 'LIKE' | 'IN';
