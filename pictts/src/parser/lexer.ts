import { ParametersLexer } from './parametersLexer';
import { ConstraintsLexer } from './constrainsLexer';
import * as T from './token';
import { SubModelLexer } from './subModelLexer';

export class Lexer {
    private readonly parametersLexer: ParametersLexer;
    private readonly constrainsLexer: ConstraintsLexer;
    private readonly submodelLexer: SubModelLexer;

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
                .filter((v) => !v.startsWith('{'))
                .map((v) => v.trim())
                .reduce((a, v) => a + v + '\n', '')
        );
        this.submodelLexer = new SubModelLexer(
            withoutComment
                .split('\n')
                .filter((v) => v.indexOf(':') === -1)
                .filter((v) => !v.startsWith('{'))
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

    subModelTokens(): T.Token[] {
        return this.submodelLexer.tokens();
    }
}
