import * as T from './token';
import * as E from '../exception';
import { Lexer } from './lexer';
import { Key, Value } from '../keyvalue';

/**
 * Divide each sentence from token array.
 */
export class SentenceParser {
    private readonly tokens: T.Token[];
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
        const results: T.Token[] = [];
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

            if (this.tokens[this.index] instanceof T.SemicolonToken) {
                type = 'constraint';
            }
        }

        if (type === undefined) {
            throw new E.ParseException('Sentence type is undefined');
        }

        if (type === 'constraint') {
            return [
                new ConstraintsSentence(this.parseAsConstraint(results)),
                eof,
            ];
        }

        return [new ParametersSentence(results), eof];
    }

    parseAsConstraint(tokens: T.Token[]): T.Token[] {
        return tokens.map((t) => {
            if (t instanceof T.IdentToken) {
                return t.asConstraint();
            }
        }) as T.Token[];
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
    readonly tokens: T.Token[];

    constructor(tokens: T.Token[]) {
        this.tokens = tokens;
    }
}

export class ConstraintsSentence extends Sentence {}
export class ParametersSentence extends Sentence {
    readonly key: Key;
    readonly parameters: Value[];
    constructor(tokens: T.Token[]) {
        super(tokens);
        this.key = ParametersSentence.getKey(tokens);
        this.parameters = ParametersSentence.getParameters(tokens);
    }

    private static getKey(tokens: T.Token[]): Key {
        const first = tokens[0];
        if (first instanceof T.IdentToken) {
            return Key.of(first.literal);
        }
        throw new E.ParseException(
            'parameters sentence first token requires identifier. but:' + first
        );
    }

    private static getParameters(tokens: T.Token[]): Value[] {
        const parameters: Value[] = [];
        tokens.slice(2).forEach((t) => {
            if (t instanceof T.IdentToken) {
                parameters.push(Value.of(t.literal));
            }
        });
        return parameters;
    }
}
