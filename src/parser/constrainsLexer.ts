import * as T from './token';

export class ConstraintsLexer {
    private index = 0;
    private readonly input: string;

    private now: string;
    constructor(input: string) {
        this.input = input;
        this.now = input.charAt(0);
    }

    tokens(): T.Token[] {
        let t = T.ReturnToken.TOKEN;
        const r: T.Token[] = [];
        while (t instanceof T.EOFToken == false) {
            t = this.nextToken();
            r.push(t);
        }
        return r;
    }

    private nextToken(): T.Token {
        this.skipWhitespace();
        if (this.isEOF()) {
            return new T.EOFToken();
        }

        try {
            switch (this.now) {
                case ':':
                    return T.ColonToken.TOKEN;
                case ';':
                    return T.SemicolonToken.TOKEN;
                case ',':
                    return T.CommaToken.TOKEN;
                case '\r':
                case '\n':
                    this.skipReturnAndWhitespace();
                    return T.ReturnToken.TOKEN;
                case '"':
                    return new T.StringToken(this.readString());
                case '[':
                    return new T.ParameterNameToken(this.readParameterName());
                default: {
                    return new T.IdentToken(this.readIdent()).asConstraint();
                }
            }
        } finally {
            if (this.lastChar()) {
                // for EOF
                this.index++;
            } else {
                this.nextChar();
            }
        }
    }

    private nextChar() {
        this.now = this.input.charAt(++this.index);
    }

    private peekChar(): string {
        return this.input.charAt(this.index + 1);
    }

    private lastChar(): boolean {
        if (this.input.length - 1 == this.index) {
            return true;
        }
        return false;
    }

    private isEOF(): boolean {
        return this.index >= this.input.length;
    }

    private readIdent(): string {
        let result = '';
        this.nextChar();

        while (this.now !== ' ' && this.now !== '\n' && this.now != '\r') {
            result += this.now;
            if (this.lastChar()) {
                return result;
            }
            this.nextChar();
        }

        return result;
    }

    private readString(): string {
        let result = '';
        this.nextChar();

        while (this.now !== '"') {
            result += this.now;
            if (this.lastChar()) {
                return result;
            }
            this.nextChar();
        }

        return result;
    }

    private readParameterName(): string {
        let result = '';
        this.nextChar();

        while (this.now !== ']') {
            result += this.now;
            if (this.lastChar()) {
                return result;
            }
            this.nextChar();
        }

        return result;
    }

    private skipWhitespace() {
        while (this.now === ' ') {
            this.nextChar();
        }
    }

    private skipReturnAndWhitespace() {
        while (
            this.peekChar() === '\r' ||
            this.peekChar() === '\n' ||
            this.peekChar() === ' '
        ) {
            this.nextChar();
        }
    }
}
