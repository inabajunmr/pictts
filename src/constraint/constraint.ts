import { Key, Value } from '../keyvalue';
// import { ConstraintsSentence } from '../parser/sentenceParser';
// import { ParameterNameToken, RelationToken, Token } from '../parser/token';
// import { Term } from './term';

// class Constraint {
//     constructor(sentence: ConstraintsSentence) {
//         sentence.tokens;

//         // TODO
//     }

//     match(kv: Map<Key, Value>): boolean {
//         return true;
//     }
// }

export abstract class Clause {
    private readonly not: boolean;

    constructor(not: boolean) {
        this.not = not;
    }

    operate(record: Map<Key, Value>): boolean {
        if (this.not) {
            return !this.ioperate(record);
        }
        return this.ioperate(record);
    }

    abstract ioperate(record: Map<Key, Value>): boolean;
}
