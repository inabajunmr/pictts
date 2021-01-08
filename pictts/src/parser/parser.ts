import * as S from './sentenceParser';
import { Pict } from '../evaluator';
import { Key } from '../keyvalue/key';
import { Value } from '../keyvalue/value';
import { Constraint } from '../constraint/constraint';

export class Parser {
    private sentences: S.SentenceParser;
    constructor(input: string) {
        this.sentences = new S.SentenceParser(input);
    }

    parse(): Pict {
        return new Pict(this.parseParameters(), this.parseConstraints());
    }

    parseParameters(): Map<Key, Value[]> {
        let eof = false;
        const result = new Map<Key, Value[]>();
        do {
            // parse 1 sentence
            const s = this.sentences.nextParametersSentence();
            eof = s[1];
            const sentence = s[0];
            result.set(sentence.key, sentence.parameters);
        } while (!eof);
        return result;
    }

    parseConstraints(): Constraint[] {
        let eof = false;
        const result: Constraint[] = [];
        do {
            // parse 1 sentence
            const s = this.sentences.nextConstraintsSentence();
            eof = s[1];
            const sentence = s[0];
            if (sentence.tokens.length !== 0) {
                result.push(new Constraint(sentence));
            }
        } while (!eof);
        return result;
    }
}
