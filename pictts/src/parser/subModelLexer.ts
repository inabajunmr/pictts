import * as T from './token';

export class SubModelLexer {
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
        this.skipReturnAndWhitespace();

        if (this.isEOF()) {
            return new T.EOFToken();
        }

        try {
            switch (this.now) {
                case '{':
                    return T.LCurlyBraceToken.TOKEN;
                case '}':
                    return T.RCurlyBraceToken.TOKEN;
                case ',':
                    return T.CommaToken.TOKEN;
                case '@':
                    return T.AtMarkToken.TOKEN;
                default: {
                    return new T.IdentToken(this.readIdent());
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
        while (
            this.now !== ' ' &&
            this.now !== '\n' &&
            this.now != '\r' &&
            this.now != ',' &&
            this.now != '}'
        ) {
            result += this.now;
            if (this.lastChar()) {
                return result;
            }
            this.nextChar();
        }

        // semicolon doesn't include in ident but need to recognize as token
        if (this.now === '}' || this.now === ',') {
            this.index--;
        }

        return result;
    }

    private skipReturnAndWhitespace() {
        while (this.now === ' ' || this.now === '\r' || this.now === '\n') {
            this.nextChar();
        }
    }
}
