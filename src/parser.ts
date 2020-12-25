import { Token } from './token';

import * as T from './token';
import { Lexer } from './lexer';

class Parser {
    parse(): Pict {
        return new Pict();
    }
}
class Pict {
    private readonly parameters = new Map<string, string>();
}
