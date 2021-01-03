import { ParametersLexer } from './parametersLexer';
import { ConstraintsLexer } from './constrainsLexer';
import * as T from './token';

export class Lexer {
    private readonly parametersLexer: ParametersLexer;
    private readonly constrainsLexer: ConstraintsLexer;

    constructor(input: string) {
        const withoutComment = input.replace(/#.*/g, '');
        this.parametersLexer = new ParametersLexer(
            withoutComment
                .split('\n')
                .filter((v) => v.indexOf(':') !== -1)
                .map((v) => v.trim())
                .reduce((a, v) => a + v + '\n', '')
        );
        this.constrainsLexer = new ConstraintsLexer(
            withoutComment
                .split('\n')
                .filter((v) => v.indexOf(':') === -1)
                .map((v) => v.trim())
                .reduce((a, v) => a + v + '\n', '')
        );
    }

    parametersTokens(): T.Token[] {
        return this.parametersLexer.tokens();
    }

    constraintsTokens(): T.Token[] {
        return this.constrainsLexer.tokens();
    }
}
