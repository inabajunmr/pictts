import * as S from './sentenceParser';
import { Pict } from './evaluator';

export class Parser {
    private sentences: S.SentenceParser;
    constructor(input: string) {
        this.sentences = new S.SentenceParser(input);
    }

    parse(): Pict {
        let eof = false;
        const result = new Map<string, Array<string>>();
        do {
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
