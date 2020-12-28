import * as T from './token';
import * as E from './exception';
import { Lexer } from './lexer';

/**
 * Divide each sentence from token array.
 */
export class SentenceParser {
    private readonly tokens: Array<T.Token>;
    private index = 0;

    constructor(input: string) {
        this.tokens = new Lexer(input).tokens();
    }

    /**
     * Get next sentence.
     *
     * If the sentence is last, second return value is true.
     */
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
        return [new ParametersSentence(results), eof];
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

export abstract class Sentence {
    readonly tokens: Array<T.Token>;

    constructor(tokens: Array<T.Token>) {
        this.tokens = tokens;
    }
}

export class ParametersSentence extends Sentence {
    readonly key: string;
    readonly parameters: Array<string>;
    constructor(tokens: Array<T.Token>) {
        super(tokens);
        this.key = ParametersSentence.getKey(tokens);
        this.parameters = ParametersSentence.getParameters(tokens);
    }

    private static getKey(tokens: Array<T.Token>): string {
        const first = tokens[0];
        if (first instanceof T.IdentToken) {
            return first.literal;
        }
        throw new E.ParseException(
            'parameters sentence first token requires identifier. but:' + first
        );
    }

    private static getParameters(tokens: Array<T.Token>): Array<string> {
        const parameters = new Array<string>();
        tokens.slice(2).forEach((t) => {
            if (t instanceof T.IdentToken) {
                parameters.push(t.literal);
            }
        });
        return parameters;
    }
}
