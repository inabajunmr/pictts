import * as T from './token';

export class Lexer {
    private index = 0;
    private readonly input: string;
    private now: string;
    constructor(input: string) {
        this.input = input;
        this.now = input.charAt(0);
    }

    nextToken(): T.Token {
        this.skipWhitespace();
        if (this.isEOF()) {
            return new T.EOFToken();
        }

        try {
            switch (this.now) {
                case ':':
                    return T.ColonToken.TOKEN;
                case ',':
                    return T.CommaToken.TOKEN;
                default:
                    return new T.IdentToken(this.readString());
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
        return this.index === this.now.length;
    }

    private readString(): string {
        let result = '';
        while (!this.endString()) {
            result += this.now;
            if (this.lastChar()) {
                break;
            }
            this.nextChar();
        }
        return result;
    }

    private endString(): boolean {
        switch (this.now) {
            case ':':
            case ',':
            case '\n':
            case '\r':
                return true;
            default:
                return false;
        }
    }

    private skipWhitespace() {
        while (this.now === ' ' || this.now === '\n' || this.now === '\r') {
            this.nextChar();
        }
    }
}
