import * as C from './combination';
export class Pict {
    readonly parameters: Map<string, Array<string>>;
    constructor(parameters: Map<string, Array<string>>) {
        this.parameters = parameters;
    }

    combination() {
        const keys: string[] = [];
        this.parameters.forEach((v, k) => {
            keys.push(k);
        });

        const keyCombinations = C.combinationsBySingleArray(keys, 2);
        keyCombinations.forEach((kc) => {
            const combinations = C.allCombinationsByMultipleArray(
                kc,
                this.parameters
            );
        });
    }
}
