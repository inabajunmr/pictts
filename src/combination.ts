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
): Combination[] {
    const result = new Array<Combination>();

    // ex.[['a','b','c'],['x','y','z']]
    const params = keys.map((k) => {
        return kvs.get(k) as string[];
    });
    iCombinationsByMultipleArray(params, keys, 0, new Combination(), result);
    return result;
}

function iCombinationsByMultipleArray(
    parameters: string[][],
    keys: string[],
    depth: number,
    tmp: Combination,
    result: Combination[]
) {
    if (depth == parameters.length) {
        result.push(tmp.clone());
        // tmp.clear();
        return;
    }

    parameters[depth].forEach((p) => {
        tmp.put(depth, keys[depth], p);
        iCombinationsByMultipleArray(parameters, keys, depth + 1, tmp, result);
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
    values: string[];
    constructor() {
        this.keys = new Array<string>();
        this.values = new Array<string>();
    }

    clone(): Combination {
        const clone = new Combination();
        clone.keys = Array.from(this.keys);
        clone.values = Array.from(this.values);
        return clone;
    }

    clear() {
        this.keys = [];
        this.values = [];
    }

    put(index: number, key: string, value: string) {
        this.keys[index] = key;
        this.values[index] = value;
    }
}
