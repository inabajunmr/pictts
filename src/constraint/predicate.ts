import { Key, Value } from '../keyvalue';
import {
    AndToken,
    EOFToken,
    LParenthesesToken,
    NotToken,
    ParameterNameToken,
    RParenthesesToken,
    Token,
} from '../parser/token';
import { Clause } from './clause';
import { ForceBoolean } from './forceBool';
import { Term } from './term';

export class Predicate extends Clause {
    private readonly left: Clause | null = null;
    private readonly right: Predicate | null = null;
    private readonly logicalOperator: LogicalOperator | null = null;
    constructor(not: boolean, input: Token[]) {
        super(not);
        let nextNot = false;
        if (input[0] instanceof NotToken) {
            input.shift();
            nextNot = true;
        }

        if (input[0] instanceof ParameterNameToken) {
            this.left = new Term(nextNot, input);
        }

        if (input[0] instanceof LParenthesesToken) {
            input.shift(); // remove '('
            this.left = new Predicate(nextNot, input);
            input.shift(); // remove ')'
        }

        if (
            input.length === 0 ||
            input[0] instanceof EOFToken ||
            input[0] instanceof RParenthesesToken
        ) {
            // at predicate, EOFToken will never appears but for test...
            return;
        }

        const operator = input.shift();
        if (operator instanceof AndToken) {
            this.logicalOperator = 'AND';
        } else {
            this.logicalOperator = 'OR';
        }

        let nextNot2 = false;
        if (input[0] instanceof NotToken) {
            input.shift();
            nextNot2 = true;
        }
        this.right = new Predicate(nextNot2, input);

        if (input.length === 0 || input[0] instanceof EOFToken) {
            // at predicate, EOFToken will never appears but for test...
            return;
        }
    }

    operate(record: Map<Key, Value>): ForceBoolean {
        if (this.right === null) {
            const result = this.left!.operate(record);
            if (result.isForce()) {
                return result;
            }
            if (this.not) {
                return result.flip();
            }
            return result;
        }

        const l = this.left!.operate(record);
        const r = this.right.operate(record);

        let result = new ForceBoolean(false, false);
        if (this.logicalOperator === 'AND') {
            result = l.and(r);
        } else {
            result = l.or(r);
        }

        if (result.isForce()) {
            return result;
        }

        if (this.not) {
            return result.flip();
        }
        return result;
    }
}

type LogicalOperator = 'AND' | 'OR';
