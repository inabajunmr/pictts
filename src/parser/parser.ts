import * as S from './sentenceParser';
import { Pict } from '../evaluator';
import { Key, Value } from '../keyvalue';

export class Parser {
    private sentences: S.SentenceParser;
    constructor(input: string) {
        this.sentences = new S.SentenceParser(input);
    }

    parse(): Pict {
        const parameters = this.parseParameters();

        return new Pict(parameters);
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
}
