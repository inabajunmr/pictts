import * as T from './token';
import * as E from '../exception';
import { Lexer } from './lexer';
import { Key, Value } from '../keyvalue';

/**
 * Divide each sentence from token array.
 */
export class SentenceParser {
    private readonly parametersTokens: T.Token[];
    private readonly constraintsTokens: T.Token[];
    private readonly subModelTokens: T.Token[];
    private pindex = 0;
    private cindex = 0;
    private sindex = 0;

    constructor(input: string) {
        const l = new Lexer(input);
        this.parametersTokens = l.parametersTokens();
        this.constraintsTokens = l.constraintsTokens();
        this.subModelTokens = l.subModelTokens();
    }

    /**
     * Get next parameters sentence.
     *
     * If the sentence is last, second return value is true.
     */
    nextParametersSentence(): [ParametersSentence, boolean] {
        const results: T.Token[] = [];
        let eof = false;
        for (; this.pindex < this.parametersTokens.length; this.pindex++) {
            if (
                this.parametersTokens[this.pindex] instanceof T.ReturnToken ||
                this.parametersTokens[this.pindex] instanceof T.EOFToken
            ) {
                eof = this.pisEOF();
                break;
            }

            results.push(this.parametersTokens[this.pindex]);
        }

        return [new ParametersSentence(results), eof];
    }

    /**
     * Get next subModel sentence.
     *
     * If the sentence is last, second return value is true.
     */
    nextSubModelSentence(): [SubModelSentence | undefined, boolean] {
        const results: T.Token[] = [];
        let eof = false;
        for (; this.sindex < this.subModelTokens.length; this.sindex++) {
            if (
                this.subModelTokens[this.sindex] instanceof T.ReturnToken ||
                this.subModelTokens[this.sindex] instanceof T.EOFToken
            ) {
                eof = this.sisEOF();
                break;
            }

            results.push(this.subModelTokens[this.sindex]);
        }

        if (results.length === 0) {
            return [undefined, eof];
        }

        return [new SubModelSentence(results), eof];
    }

    /**
     * Get next constraints sentence.
     *
     * If the sentence is last, second return value is true.
     */
    nextConstraintsSentence(): [ConstraintsSentence, boolean] {
        const results: T.Token[] = [];

        let eof = false;
        for (; this.cindex < this.constraintsTokens.length; this.cindex++) {
            if (
                this.constraintsTokens[this.cindex] instanceof
                    T.SemicolonToken ||
                this.constraintsTokens[this.cindex] instanceof T.EOFToken
            ) {
                this.cindex++;
                eof = this.cisEOF();
                break;
            }

            results.push(this.constraintsTokens[this.cindex]);
        }

        // no sentence
        if (results.length === 0) {
            return [new ConstraintsSentence(results), true];
        }

        return [new ConstraintsSentence(results), eof];
    }

    private cisEOF(): boolean {
        for (; this.cindex < this.parametersTokens.length; this.cindex++) {
            if (
                this.parametersTokens[this.cindex] instanceof T.ReturnToken ==
                    false &&
                this.parametersTokens[this.cindex] instanceof T.EOFToken ==
                    false
            ) {
                return false;
            }
        }

        return true;
    }

    private pisEOF(): boolean {
        for (; this.pindex < this.parametersTokens.length; this.pindex++) {
            if (
                this.parametersTokens[this.pindex] instanceof T.ReturnToken ==
                    false &&
                this.parametersTokens[this.pindex] instanceof T.EOFToken ==
                    false
            ) {
                return false;
            }
        }

        return true;
    }

    private sisEOF(): boolean {
        for (; this.sindex < this.subModelTokens.length; this.sindex++) {
            if (
                this.subModelTokens[this.sindex] instanceof T.ReturnToken ==
                    false &&
                this.subModelTokens[this.sindex] instanceof T.EOFToken == false
            ) {
                return false;
            }
        }

        return true;
    }
}

export class ConstraintsSentence {
    readonly tokens: T.Token[];

    constructor(tokens: T.Token[]) {
        this.tokens = tokens;
    }
}
export class ParametersSentence {
    readonly key: Key;
    readonly parameters: Value[];
    constructor(tokens: T.Token[]) {
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

export class SubModelSentence {
    readonly keys: Key[] = [];
    readonly order: number;
    constructor(tokens: T.Token[]) {
        tokens
            .slice(
                tokens.indexOf(T.LCurlyBraceToken.TOKEN) + 1,
                tokens.indexOf(T.RCurlyBraceToken.TOKEN)
            )
            .forEach((v, i) => {
                if (i % 2 === 0) {
                    this.keys.push(Key.of((v as T.IdentToken).literal));
                }
            });
        this.order = parseInt(
            (tokens[tokens.indexOf(T.AtMarkToken.TOKEN) + 1] as T.IdentToken)
                .literal
        );
    }
}
