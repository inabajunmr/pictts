import { Key, Value } from '../keyvalue';
import { ForceBoolean } from './forceBool';
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
    protected not: boolean;

    constructor(not: boolean) {
        this.not = not;
    }

    abstract ioperate(record: Map<Key, Value>): ForceBoolean;
}
