import { Key, Value } from '../keyvalue';
import { ConstraintsSentence } from '../parser/sentenceParser';
import { ElseToken, ThenToken } from '../parser/token';
import { Predicate } from './predicate';

export class Constraint {
    if: Predicate;
    then: Predicate;
    else: Predicate | null = null;

    constructor(sentence: ConstraintsSentence) {
        // divide IF, THEN, ELSE
        const tokens = sentence.tokens;
        this.if = new Predicate(
            false,
            tokens.slice(1, tokens.indexOf(ThenToken.TOKEN))
        );

        if (tokens.indexOf(ElseToken.TOKEN) !== -1) {
            this.then = new Predicate(
                false,
                tokens.slice(
                    tokens.indexOf(ThenToken.TOKEN) + 1,
                    tokens.indexOf(ElseToken.TOKEN)
                )
            );
            this.else = new Predicate(
                false,
                tokens.slice(tokens.indexOf(ThenToken.TOKEN) + 1, tokens.length)
            );
        } else {
            this.then = new Predicate(
                false,
                tokens.slice(tokens.indexOf(ThenToken.TOKEN) + 1, tokens.length)
            );
        }
    }

    match(kv: Map<Key, Value>): boolean {
        if (this.if.ioperate(kv).isTrue()) {
            return this.then.ioperate(kv).isTrue();
        } else {
            if (this.else !== null) {
                return this.else.ioperate(kv).isTrue();
            }
        }

        return true;
    }
}
