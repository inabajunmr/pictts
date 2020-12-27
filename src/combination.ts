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
): Combinations {
    const result = new Combinations(keys);

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
    result: Combinations
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

/**
 * Get longest size combinations.
 *
 * If combinations.keys and exceptKeys are same, it will skipped.
 */
export function longestCombination(
    exceptKeys: string[],
    cs: Combinations[]
): Combinations {
    let excepted = cs;
    if (exceptKeys.length !== 0) {
        excepted = cs.filter((c) => {
            const result = c.keys.filter((k) => exceptKeys.indexOf(k) === -1)
                .length;
            return result !== 0;
        });
    }

    return excepted.reduce((b, a) => {
        return b.allCombinations.length >= a.allCombinations.length ? b : a;
    });
}
export class Combinations {
    keys: string[];
    allCombinations: string[][];
    constructor(keys: string[]) {
        this.keys = keys;
        this.allCombinations = [];
    }

    clone(): Combinations {
        const clone = new Combinations(this.keys);
        clone.allCombinations = Array.from(this.allCombinations);
        return clone;
    }
}
