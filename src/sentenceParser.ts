import * as T from './token';
import * as E from './exception';
import { Lexer } from './lexer';

export class SentenceParser {
    private readonly tokens: Array<T.Token>;
    private index = 0;

    constructor(input: string) {
        this.tokens = new Lexer(input).tokens();
    }

    nextSentence(): [Sentence, boolean] {
        let type: SentenceType | undefined = undefined;
        const results = new Array<T.Token>();
        let eof = false;
        for (; this.index < this.tokens.length; this.index++) {
            if (
                type === 'parameters' &&
                (this.tokens[this.index] instanceof T.ReturnToken ||
                    this.tokens[this.index] instanceof T.EOFToken)
            ) {
                eof = this.isEOF();
                break;
            }

            results.push(this.tokens[this.index]);
            if (this.tokens[this.index] instanceof T.ColonToken) {
                type = 'parameters';
            }
        }

        if (type === undefined) {
            throw new E.ParseException('Sentence type is undefined');
        }
        return [new Sentence(type, results), eof];
    }

    private isEOF(): boolean {
        for (; this.index < this.tokens.length; this.index++) {
            if (
                this.tokens[this.index] instanceof T.ReturnToken == false &&
                this.tokens[this.index] instanceof T.EOFToken == false
            ) {
                return false;
            }
        }

        return true;
    }
}

type SentenceType = 'parameters' | 'constraint';

class Sentence {
    readonly tokens: Array<T.Token>;
    readonly type: SentenceType;

    constructor(type: SentenceType, tokens: Array<T.Token>) {
        this.tokens = tokens;
        this.type = type;
    }
}
