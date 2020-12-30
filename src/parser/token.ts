import { ParseException } from '../exception';

export abstract class Token {}

/**
 * Identifier
 */
export class IdentToken extends Token {
    toString(): string {
        return `Ident: ${this.literal}`;
    }

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
            case 'AND':
                return AndToken.TOKEN;
            case 'OR':
                return OrToken.TOKEN;
            case 'LIKE':
                return LikeToken.TOKEN;
            case 'IN':
                return InToken.TOKEN;
            case 'NOT':
                return NotToken.TOKEN;
            default:
                throw new ParseException(`${this.literal} is undefined.`);
        }
    }
}

/**
 * :
 */
export class ColonToken extends Token {
    toString(): string {
        return `Colon`;
    }

    static readonly TOKEN = new ColonToken();
    private constructor() {
        super();
    }
}

/**
 * ;
 */
export class SemicolonToken extends Token {
    toString(): string {
        return `Semicolon`;
    }

    static readonly TOKEN = new SemicolonToken();
    private constructor() {
        super();
    }
}

/**
 * ,
 */
export class CommaToken extends Token {
    toString(): string {
        return `Comma`;
    }

    static readonly TOKEN = new CommaToken();
    private constructor() {
        super();
    }
}

/**
 * EOF
 */
export class EOFToken extends Token {
    toString(): string {
        return `EOF`;
    }
}

/**
 * \r\n
 */
export class ReturnToken extends Token {
    toString(): string {
        return `Return`;
    }

    static readonly TOKEN = new ReturnToken();
    private constructor() {
        super();
    }
}

/**
 * [Xxxx]
 */
export class ParameterNameToken extends Token {
    toString(): string {
        return `ParameterName: ${this.literal}`;
    }

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
    toString(): string {
        return `String: ${this.literal}`;
    }

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
    toString(): string {
        return `IF`;
    }

    static readonly TOKEN = new IfToken();
    constructor() {
        super();
    }
}

/**
 * ELSE
 */
export class ElseToken extends Token {
    toString(): string {
        return `ELSE`;
    }

    static readonly TOKEN = new ElseToken();
    constructor() {
        super();
    }
}

/**
 * THEN
 */
export class ThenToken extends Token {
    toString(): string {
        return `THEN`;
    }

    static readonly TOKEN = new ThenToken();
    constructor() {
        super();
    }
}

/**
 * AND
 */
export class AndToken extends Token {
    toString(): string {
        return `AND`;
    }

    static readonly TOKEN = new AndToken();
    constructor() {
        super();
    }
}

/**
 * OR
 */
export class OrToken extends Token {
    toString(): string {
        return `OR`;
    }

    static readonly TOKEN = new OrToken();
    constructor() {
        super();
    }
}

/**
 * NOT
 */
export class NotToken extends Token {
    toString(): string {
        return `NOT`;
    }

    static readonly TOKEN = new NotToken();
    constructor() {
        super();
    }
}

/**
 * LIKE
 */
export class LikeToken extends Token {
    toString(): string {
        return `LIKE`;
    }

    static readonly TOKEN = new LikeToken();
    constructor() {
        super();
    }
}

/**
 * IN
 */
export class InToken extends Token {
    toString(): string {
        return `IN`;
    }

    static readonly TOKEN = new InToken();
    constructor() {
        super();
    }
}

/**
 * (
 */
export class LParenthesesToken extends Token {
    toString(): string {
        return `(`;
    }

    static readonly TOKEN = new LParenthesesToken();
    constructor() {
        super();
    }
}

/**
 * )
 */
export class RParenthesesToken extends Token {
    toString(): string {
        return `)`;
    }

    static readonly TOKEN = new RParenthesesToken();
    constructor() {
        super();
    }
}

/**
 * {
 */
export class LCurlyBraceToken extends Token {
    toString(): string {
        return `{`;
    }

    static readonly TOKEN = new LCurlyBraceToken();
    constructor() {
        super();
    }
}

/**
 * }
 */
export class RCurlyBraceToken extends Token {
    toString(): string {
        return `}`;
    }

    static readonly TOKEN = new RCurlyBraceToken();
    constructor() {
        super();
    }
}

/**
 * =
 */
export class EqualToken extends Token {
    toString(): string {
        return `=`;
    }

    static readonly TOKEN = new EqualToken();
    constructor() {
        super();
    }
}

export class RelationToken extends Token {}

/**
 * >
 */
export class GreaterThanToken extends RelationToken {
    toString(): string {
        return `>`;
    }

    static readonly TOKEN = new GreaterThanToken();
    constructor() {
        super();
    }
}

/**
 * >=
 */
export class GreaterThanEqualToken extends RelationToken {
    toString(): string {
        return `>=`;
    }

    static readonly TOKEN = new GreaterThanEqualToken();
    constructor() {
        super();
    }
}

/**
 * <
 */
export class LessThanToken extends RelationToken {
    toString(): string {
        return `<`;
    }

    static readonly TOKEN = new LessThanToken();
    constructor() {
        super();
    }
}

/**
 * <=
 */
export class LessThanEqualToken extends RelationToken {
    toString(): string {
        return `<=`;
    }

    static readonly TOKEN = new LessThanEqualToken();
    constructor() {
        super();
    }
}

/**
 * <>
 */
export class NotEqualToken extends RelationToken {
    toString(): string {
        return `<>`;
    }

    static readonly TOKEN = new NotEqualToken();
    constructor() {
        super();
    }
}
