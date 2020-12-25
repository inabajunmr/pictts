import { Token } from './token';

import * as T from './token';
import { Lexer } from './lexer';
import { SentenceParser, Sentence } from './sentenceParser';

class Parser {
    private sentences: SentenceParser;
    constructor(input: string) {
        this.sentences = new SentenceParser(input);
    }

    parse(): Pict {
        let s: [Sentence, boolean] = [new Sentence('parameters', []), false];
        do {
            s = this.sentences.nextSentence();
        } while (s[1]);

        return new Pict();
    }
}
class Pict {
    private readonly parameters = new Map<string, Array<string>>();
}
