/**
 * All combination by multiple params.
 *
 * Ex. Values is `{'A':['a','b','c'], 'X':['x','y','z'], 'N':['1','2','3']}` and keys is ['A', 'X'],
 * return [['a','x'],['a','y'],['a','z'],['b','x'],['b','y'],['b','z'],['c','x'],['c','y'],['c','z']]
 * @param keys
 */
export function allCombinationsByMultipleArray(
    keys: string[],
    kvs: Map<string, string[]>
): Combination {
    const result = new Combination(keys);

    // ex.[['a','b','c'],['x','y','z']]
    const params = keys.map((k) => {
        return kvs.get(k) as string[];
    });
    iCombinationsByMultipleArray(params, 0, [], result);
    return result;
}

function iCombinationsByMultipleArray(
    parameters: string[][],
    depth: number,
    tmp: string[],
    result: Combination
) {
    if (depth == parameters.length) {
        result.allCombinations.push(Array.from(tmp));
        return;
    }

    parameters[depth].forEach((p) => {
        tmp[depth] = p;
        iCombinationsByMultipleArray(parameters, depth + 1, tmp, result);
    });
}

/**
 * Return all values combination.
 *
 * ex. values is `['a','b','c']` and factorCount is 2, return `[['a','b'],['a','c'],['b','c']]`.
 * @param factorCount
 */
export function combinationsBySingleArray(
    array: string[],
    factorCount: number
): string[][] {
    const result = new Array<Array<string>>();
    iCombinationsBySingleArray(array, [], factorCount, 0, result);
    return result;
}

function iCombinationsBySingleArray(
    input: string[],
    tmp: string[],
    factorCount: number,
    depth: number,
    result: string[][]
) {
    input.forEach((v, i) => {
        tmp[depth] = v;
        if (depth === factorCount - 1) {
            result.push(Array.from(tmp));
            return;
        }

        return iCombinationsBySingleArray(
            input.slice(i + 1, input.length),
            tmp,
            factorCount,
            depth + 1,
            result
        );
    });
}

class Combination {
    keys: string[];
    allCombinations: string[][];
    constructor(keys: string[]) {
        this.keys = keys;
        this.allCombinations = [];
    }

    clone(): Combination {
        const clone = new Combination(this.keys);
        clone.allCombinations = Array.from(this.allCombinations);
        return clone;
    }

    clear() {
        this.keys = [];
        this.allCombinations = [];
    }

    put(index: number, value: string) {
        if (this.allCombinations[index] === undefined) {
            this.allCombinations[index] = [];
        }
        this.allCombinations[index].push(value);
    }
}
