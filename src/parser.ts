import { Token } from './token';

import * as T from './token';
import { Lexer } from './lexer';
import * as S from './sentenceParser';

class Parser {
    private sentences: S.SentenceParser;
    constructor(input: string) {
        this.sentences = new S.SentenceParser(input);
    }

    parse(): Pict {
        let s: [S.Sentence, boolean] = [new S.ParametersSentence([]), false];
        do {
            s = this.sentences.nextSentence();
        } while (s[1]);

        return new Pict();
    }
}
class Pict {
    private readonly parameters = new Map<string, Array<string>>();
}
