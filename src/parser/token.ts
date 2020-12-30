import { ParseException } from '../exception';

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

    asConstraint(): Token {
        switch (this.literal) {
            case 'IF':
                return IfToken.TOKEN;
            case '>':
                return GreaterThanToken.TOKEN;
            case '(':
                return LParenthesesToken.TOKEN;
            case ')':
                return RParenthesesToken.TOKEN;
            case '>=':
                return GreaterThanEqualToken.TOKEN;
            case '<':
                return LessThanToken.TOKEN;
            case '<=':
                return LessThanEqualToken.TOKEN;
            case '<>':
                return NotEqualToken.TOKEN;
            case 'ELSE':
                return ElseToken.TOKEN;
            case 'THEN':
                return ThenToken.TOKEN;
            case 'and':
                return AndToken.TOKEN;
            case 'or':
                return OrToken.TOKEN;
            default:
                throw new ParseException(`${this.literal} is undefined.`);
        }
    }
}

/**
 * :
 */
export class ColonToken extends Token {
    static readonly TOKEN = new ColonToken();
    private constructor() {
        super();
    }
}

/**
 * ;
 */
export class SemicolonToken extends Token {
    static readonly TOKEN = new SemicolonToken();
    private constructor() {
        super();
    }
}

/**
 * ,
 */
export class CommaToken extends Token {
    static readonly TOKEN = new CommaToken();
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
    static readonly TOKEN = new ReturnToken();
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

/**
 * IF
 */
export class IfToken extends Token {
    static readonly TOKEN = new IfToken();
    constructor() {
        super();
    }
}

/**
 * ELSE
 */
export class ElseToken extends Token {
    static readonly TOKEN = new ElseToken();
    constructor() {
        super();
    }
}

/**
 * Then
 */
export class ThenToken extends Token {
    static readonly TOKEN = new ThenToken();
    constructor() {
        super();
    }
}

/**
 * and
 */
export class AndToken extends Token {
    static readonly TOKEN = new AndToken();
    constructor() {
        super();
    }
}

/**
 * or
 */
export class OrToken extends Token {
    static readonly TOKEN = new OrToken();
    constructor() {
        super();
    }
}

/**
 * (
 */
export class LParenthesesToken extends Token {
    static readonly TOKEN = new LParenthesesToken();
    constructor() {
        super();
    }
}

/**
 * )
 */
export class RParenthesesToken extends Token {
    static readonly TOKEN = new RParenthesesToken();
    constructor() {
        super();
    }
}

/**
 * =
 */
export class EqualToken extends Token {
    static readonly TOKEN = new EqualToken();
    constructor() {
        super();
    }
}
/**
 * >
 */
export class GreaterThanToken extends Token {
    static readonly TOKEN = new GreaterThanToken();
    constructor() {
        super();
    }
}

/**
 * >=
 */
export class GreaterThanEqualToken extends Token {
    static readonly TOKEN = new GreaterThanToken();
    constructor() {
        super();
    }
}

/**
 * <
 */
export class LessThanToken extends Token {
    static readonly TOKEN = new LessThanToken();
    constructor() {
        super();
    }
}

/**
 * <
 */
export class LessThanEqualToken extends Token {
    static readonly TOKEN = new LessThanEqualToken();
    constructor() {
        super();
    }
}

/**
 * <>
 */
export class NotEqualToken extends Token {
    static readonly TOKEN = new NotEqualToken();
    constructor() {
        super();
    }
}
