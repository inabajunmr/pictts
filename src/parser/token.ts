export abstract class Token {}

/**
 * Identifier
 */
export class IdentToken extends Token {
    readonly literal: string;
    constructor(literal: string) {
        super();
        this.literal = literal;
    }
}

/**
 * :
 */
export class ColonToken extends Token {
    static TOKEN = new ColonToken();
    private constructor() {
        super();
    }
}

/**
 * ,
 */
export class CommaToken extends Token {
    static TOKEN = new CommaToken();
    private constructor() {
        super();
    }
}

/**
 * EOF
 */
export class EOFToken extends Token {}

/**
 * \r\n
 */
export class ReturnToken extends Token {
    static TOKEN = new ReturnToken();
    private constructor() {
        super();
    }
}

/**
 * [Xxxx]
 */
export class ParameterNameToken extends Token {
    readonly literal: string;
    constructor(literal: string) {
        super();
        this.literal = literal;
    }
}

/**
 * "Xxxx"
 */
export class StringToken extends Token {
    readonly literal: string;
    constructor(literal: string) {
        super();
        this.literal = literal;
    }
}
