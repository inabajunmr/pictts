import * as S from './sentenceParser';
import { Pict } from './evaluator';
import { Key, Value } from './keyvalue';

export class Parser {
    private sentences: S.SentenceParser;
    constructor(input: string) {
        this.sentences = new S.SentenceParser(input);
    }

    parse(): Pict {
        let eof = false;
        const result = new Map<Key, Value[]>();
        do {
            // parse 1 sentence
            const s = this.sentences.nextSentence();
            eof = s[1];
            const sentence = s[0];
            if (sentence instanceof S.ParametersSentence) {
                result.set(sentence.key, sentence.parameters);
            }
        } while (!eof);

        return new Pict(result);
    }
}
