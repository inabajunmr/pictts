import { Token } from './token';

import * as T from './token';
import { Lexer } from './lexer';

class Parser {
    parse(): Pict {
        return new Pict();
    }
}

class SentenceParser {
    private readonly tokens: Array<T.Token>;
    private index = 0;

    constructor(input: string) {
        this.tokens = new Lexer(input).tokens();
    }

    nextSentence() {
        const s = new Sentence();
        let type: SentenceType | undefined = undefined;
        const tokens = new Array<T.Token>();
        for (this.index < this.tokens.length; this.index++; ) {
            if (
                type === 'parameters' &&
                (tokens[this.index] instanceof T.EOFToken ||
                    tokens[this.index] instanceof T.ReturnToken)
            ) {
                break;
            }

            tokens.push(tokens[this.index]);
            if (tokens[this.index] instanceof T.ColonToken) {
                type = 'parameters';
            }
        }
        return s;
    }
}

type SentenceType = 'parameters' | 'constraint';

class Sentence {
    private readonly tokens: Array<T.Token>;
    private readonly type: SentenceType;

    putToken(type: SentenceType, tokens: Array<T.Token>) {
        this.tokens = tokens;
        this.type = type;
    }
}

class Pict {
    private readonly parameters = new Map<string, string>();
}
