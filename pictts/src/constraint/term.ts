import { ParseException } from '../exception';
import { Key } from '../key';
import { KeyValueMap } from '../keyvalue';
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
    NumberToken,
} from '../parser/token';
import { Value, ValueType } from '../value';
import { Clause } from './clause';
import { ForceBoolean } from './forceBool';

export class Term extends Clause {
    private readonly left: Key;
    private readonly rightValues: Value[] = [];
    private readonly rightKeys: Key[] = [];
    private readonly relationOperator: Relation;

    constructor(not: boolean, input: Token[]) {
        super(not);
        const first = input.shift();
        this.left = Key.of((first as ParameterNameToken).literal);
        const second = input.shift() as Token;
        this.relationOperator = relationTokenToRelation(second);
        const third = input.shift();
        if (third instanceof LCurlyBraceToken) {
            let t = input.shift();
            while (t !== undefined) {
                if (t instanceof RCurlyBraceToken) {
                    break;
                }
                if (t instanceof StringToken) {
                    this.rightValues.push(Value.of(t.literal));
                }
                if (t instanceof NumberToken) {
                    this.rightValues.push(Value.of(t.literal));
                }
                t = input.shift();
                // TODO IN allow keys?
            }
        } else {
            if (third instanceof ParameterNameToken) {
                this.rightKeys = [Key.of(third.literal)];
            } else if (third instanceof StringToken) {
                this.rightValues = [Value.of((third as StringToken).literal)];
            } else if (third instanceof NumberToken) {
                this.rightValues = [
                    Value.of((third as NumberToken).literal, 'number'),
                ];
            }
        }
    }

    operate(record: KeyValueMap): ForceBoolean {
        const buildForceBoolean = (
            record: KeyValueMap,
            operate: (l: string | number, r: string | number) => boolean
        ): ForceBoolean => {
            const r = this.getRightValue(record);
            const rv = r[0];
            const rtype = r[1];
            const l = this.getLeftValue(record, rtype);

            if (l === undefined || rv === undefined) {
                return new ForceBoolean(true, true);
            }

            return !this.not
                ? new ForceBoolean(operate(l, rv), false)
                : new ForceBoolean(operate(l, rv), false).flip();
        };

        switch (this.relationOperator) {
            case '=': {
                return buildForceBoolean(
                    record,
                    (l: string | number, r: string | number) => {
                        return l === r;
                    }
                );
            }
            case '<>': {
                return buildForceBoolean(
                    record,
                    (l: string | number, r: string | number) => {
                        return l !== r;
                    }
                );
            }
            case '>': {
                return buildForceBoolean(
                    record,
                    (l: string | number, r: string | number) => {
                        return l > r;
                    }
                );
            }
            case '>=': {
                return buildForceBoolean(
                    record,
                    (l: string | number, r: string | number) => {
                        return l >= r;
                    }
                );
            }
            case '<': {
                return buildForceBoolean(
                    record,
                    (l: string | number, r: string | number) => {
                        return l < r;
                    }
                );
            }
            case '<=': {
                return buildForceBoolean(
                    record,
                    (l: string | number, r: string | number) => {
                        return l <= r;
                    }
                );
            }
            case 'LIKE': {
                const l = this.getLeftValue(record, 'string');
                const pattern = this.rightValues[0];

                if (l === undefined) {
                    return new ForceBoolean(true, true);
                }

                // TODO PICT pattern is not same as js regex
                return !this.not
                    ? new ForceBoolean(
                          (l as string).match(pattern.value) !== null,
                          false
                      )
                    : new ForceBoolean(
                          (l as string).match(pattern.value) !== null,
                          false
                      ).flip();
            }
            case 'IN': {
                const l = this.getLeftValue(record, 'string');

                if (l === undefined) {
                    return new ForceBoolean(true, true);
                }

                return new ForceBoolean(
                    this.rightValues.filter((v) => v.value === l).length !== 0,
                    false
                );
            }
        }
    }

    getLeftValue(
        record: KeyValueMap,
        type: ValueType
    ): string | number | undefined {
        const lv = record.get(this.left);
        if (lv === undefined) {
            return lv;
        }
        if (type === 'number') {
            return parseFloat(lv.value);
        }
        return lv.value;
    }

    getRightValue(
        record: KeyValueMap
    ): [string | number | undefined, ValueType] {
        const v =
            this.rightValues.length !== 0
                ? this.rightValues[0]
                : record.get(this.rightKeys[0] as Key);
        if (v === undefined) {
            return [undefined, 'string' /* nonsense */];
        }

        let rv = v.value as string | number;

        if (v.type === 'number') {
            rv = parseFloat(v.value);
        }

        return [rv, v.type];
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
