import { Key, Value } from '../keyvalue';
import {
    AndToken,
    EOFToken,
    LParenthesesToken,
    ParameterNameToken,
    RParenthesesToken,
    Token,
} from '../parser/token';
import { Clause } from './constraint';
import { Term } from './term';

export class Predicate extends Clause {
    private readonly left: Clause | null = null;
    private readonly right: Predicate | null = null;
    private readonly logicalOperator: LogicalOperator | null = null;
    constructor(not: boolean, input: Token[]) {
        super(not);
        if (input[0] instanceof ParameterNameToken) {
            this.left = new Term(input);
        }

        if (input[0] instanceof LParenthesesToken) {
            input.shift(); // remove '('
            this.left = new Predicate(not, input);
            input.shift; // remove ')'
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

        this.right = new Predicate(not, input);

        if (input.length === 0 || input[0] instanceof EOFToken) {
            // at predicate, EOFToken will never appears but for test...
            return;
        }
    }

    ioperate(record: Map<Key, Value>): boolean {
        if (this.right === null) {
            return this.left!.operate(record);
        }
        const l = this.left!.operate(record);
        const r = this.right.operate(record);

        if (this.logicalOperator === 'AND') {
            return l && r;
        }
        return l || r;
    }
}

type LogicalOperator = 'AND' | 'OR';
