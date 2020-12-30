import { ParseException } from '../exception';
import { Key, Value } from '../keyvalue';
import {
    EqualToken,
    GreaterThanEqualToken,
    GreaterThanToken,
    InToken,
    LessThanEqualToken,
    LessThanToken,
    LikeToken,
    NotEqualToken,
    ParameterNameToken,
    LCurlyBraceToken,
    RCurlyBraceToken,
    StringToken,
    Token,
} from '../parser/token';
import { Clause } from './constraint';

export class Term extends Clause {
    private readonly left: Key;
    private readonly rightValues: Value[] = [];
    private readonly rightKeys: Key[] = [];
    private readonly relationOperator: Relation;

    constructor(input: Token[]) {
        super(false);
        const first = input.shift();
        this.left = Key.of((first as ParameterNameToken).literal);
        const second = input.shift() as Token;
        this.relationOperator = relationTokenToRelation(second);
        const third = input.shift();
        if (third instanceof LCurlyBraceToken) {
            for (let index = 0; index < input.length; index++) {
                const t = input.shift();
                if (t instanceof RCurlyBraceToken) {
                    break;
                }
                if (t instanceof StringToken) {
                    this.rightValues.push(Value.of(t.literal));
                }

                // TODO IN allow keys?
            }
        } else {
            if (third instanceof ParameterNameToken) {
                this.rightKeys = [Key.of(third.literal)];
            } else {
                this.rightValues = [Value.of((third as StringToken).literal)];
            }
        }
    }

    ioperate(record: Map<Key, Value>): boolean {
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

function relationTokenToRelation(t: Token): Relation {
    switch (true) {
        case t instanceof EqualToken:
            return '=';
        case t instanceof NotEqualToken:
            return '<>';
        case t instanceof GreaterThanToken:
            return '>';
        case t instanceof GreaterThanEqualToken:
            return '>=';
        case t instanceof LessThanToken:
            return '<';
        case t instanceof LessThanEqualToken:
            return '<=';
        case t instanceof LikeToken:
            return 'LIKE';
        case t instanceof InToken:
            return 'IN';
        default:
            throw new ParseException(
                `Relation operator ${t.toString()} is not defined`
            );
    }
}
