import * as T from './token';

export class Lexer {
  private index = 0;
  private readonly input: string;
  private now = '';
  constructor(input: string) {
    this.input = input;
  }

  nextToken(): T.Token {
    if (this.hasNext()) {
      return new T.EOFToken();
    }
    this.nextChar();
    this.skipWhitespace();
    switch (this.now) {
      case ':':
        return T.ColonToken.TOKEN;
      case ',':
        return T.CommaToken.TOKEN;
      default:
        return new T.IdentToken(this.readString());
    }
  }

  private nextChar() {
    this.now = this.input.charAt(this.index++);
  }

  private hasNext(): boolean {
    if (this.input.length - 1 < this.index) {
      return true;
    }
    return false;
  }

  private readString(): string {
    let result = '';
    while (!this.endString()) {
      this.nextChar();
      result += this.now;
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
    while ((this.now === ' ' || this.now === '\n', this.now === '\r')) {
      this.nextChar();
    }
  }
}
