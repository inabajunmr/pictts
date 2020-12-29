import { Key, Value } from './keyvalue';

/**
 * All combination by multiple params.
 *
 * Ex. Values is `{'A':['a','b','c'], 'X':['x','y','z'], 'N':['1','2','3']}` and keys is ['A', 'X'],
 * return [['a','x'],['a','y'],['a','z'],['b','x'],['b','y'],['b','z'],['c','x'],['c','y'],['c','z']]
 * @param keys
 */
export function allCombinationsByMultipleArray(
    keys: Key[],
    kvs: Map<Key, Value[]>
): Combinations {
    const result = new Combinations(keys);

    // ex.[['a','b','c'],['x','y','z']]
    const params = keys.map((k) => {
        return kvs.get(k) as Value[];
    });
    iCombinationsByMultipleArray(params, 0, [], result);
    return result;
}

function iCombinationsByMultipleArray(
    parameters: Value[][],
    depth: number,
    tmp: Value[],
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
    array: Key[],
    factorCount: number
): Key[][] {
    const result = new Array<Array<Key>>();
    iCombinationsBySingleArray(array, [], factorCount, 0, result);
    return result;
}

function iCombinationsBySingleArray(
    input: Key[],
    tmp: Key[],
    factorCount: number,
    depth: number,
    result: Key[][]
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
 * If combinations.keys contains all exceptKeys, it will skipped.
 */
export function longestCombination(
    exceptKeys: Key[],
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

    const ndone = excepted.filter((e) => !e.done);
    if (ndone.length !== 0) {
        return ndone.reduce((b, a) => {
            return b.allCombinations.length >= a.allCombinations.length ? b : a;
        });
    }

    return excepted.reduce((b, a) => {
        return b.allCombinations.length >= a.allCombinations.length ? b : a;
    });
}
export class Combinations {
    keys: Key[];
    allCombinations: Value[][];
    done = false;
    constructor(keys: Key[]) {
        this.keys = keys;
        this.allCombinations = [];
    }

    clone(): Combinations {
        const clone = new Combinations(this.keys);
        clone.allCombinations = Array.from(this.allCombinations);
        return clone;
    }

    remove(target: Value[]): void {
        if (this.allCombinations.length !== 1) {
            const cache = this.allCombinations.filter((c) => {
                return !this.equalsAllElements(c, target);
            });

            this.allCombinations = cache;
        }
    }

    equalsAllElements<T>(array1: T[], array2: T[]): boolean {
        if (array1 === undefined || array2 === undefined) {
            return array2 === array1;
        }

        if (array1.length !== array2.length) {
            return false;
        }

        for (let index = 0; index < array1.length; index++) {
            if (array1[index] !== array2[index]) {
                return false;
            }
        }

        return true;
    }
}
