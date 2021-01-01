import { Key, Value } from './keyvalue';

/**
 * All combination by multiple params.
 *
 * Ex. Values is `{'A':['a','b','c'], 'X':['x','y','z'], 'N':['1','2','3']}` and keys is ['A', 'X'],
 * return [['a','x'],['a','y'],['a','z'],['b','x'],['b','y'],['b','z'],['c','x'],['c','y'],['c','z']]
 * @param keys this method build combination by only this keys
 * @param kvs origin
 */
export function allCombinationsByMultipleArray(
    keys: Key[],
    kvs: Map<Key, Value[]>
): Combinations {
    const result = new Combinations(keys);

    // keys to values. ex.[['a','b','c'],['x','y','z']]
    const params = keys.map((k) => {
        return kvs.get(k) as Value[];
    });
    iAllCombinationsByMultipleArray(keys, params, 0, [], result);
    return result;
}

/**
 * Internal method for allCombinationsByMultipleArray
 * @param keys
 * @param parameters all parameters. This parameters index is same as keys.
 * @param keyIndex depth of recursive call
 * @param tmp building combination
 * @param result final result
 */
function iAllCombinationsByMultipleArray(
    keys: Key[],
    parameters: Value[][],
    keyIndex: number,
    tmp: Value[],
    result: Combinations
) {
    // it means tmp has all values of keys
    if (keyIndex == keys.length) {
        result.workingCombinations.push(
            // temp lost key information so rebuild map
            tmp.reduce((acc, v, i) => {
                return acc.set(keys[i], v);
            }, new Map<Key, Value>())
        );
        return;
    }

    parameters[keyIndex].forEach((p) => {
        tmp[keyIndex] = p;
        iAllCombinationsByMultipleArray(
            keys,
            parameters,
            keyIndex + 1,
            tmp,
            result
        );
    });
}

/**
 * Return all values combination.
 *
 * ex. values is `['a','b','c']` and factorCount is 2, return `[['a','b'],['a','c'],['b','c']]`.
 * @param array
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
 * Result never contains excludeList.
 *
 * @param excludeList
 * @param cs has key and value list
 */
export function longestCombination(
    excludeList: Key[][],
    cs: Combinations[]
): Combinations {
    const equalsKeys = (key1: Key[], key2: Key[]): boolean => {
        if (key1.length !== key2.length) {
            return false;
        }

        for (let index = 0; index < key1.length; index++) {
            if (key1[index] !== key2[index]) {
                return false;
            }
        }

        return true;
    };

    // filter excludeList
    const contains = (target: Key[], keyList: Key[][]): boolean => {
        return keyList.filter((k) => equalsKeys(target, k)).length !== 0;
    };
    let nonUsed = cs;
    if (excludeList.length !== 0) {
        nonUsed = cs.filter((c) => {
            return !contains(c.keys, excludeList);
        });
    }

    const ndone = nonUsed.filter((e) => !e.done);
    if (ndone.length !== 0) {
        return ndone.reduce((b, a) => {
            return b.workingCombinations.length >= a.workingCombinations.length
                ? b
                : a;
        });
    }

    if (nonUsed.length === 0) {
        console.log();
    }
    return nonUsed.reduce((b, a) => {
        return b.workingCombinations.length >= a.workingCombinations.length
            ? b
            : a;
    });
}
export class Combinations {
    keys: Key[];
    workingCombinations: Map<Key, Value>[] = [];
    allCombinations: Map<Key, Value>[] = [];
    done = false;
    constructor(keys: Key[]) {
        this.keys = keys;
    }

    removeFromWorking(target: Map<Key, Value>): void {
        if (this.workingCombinations.length !== 1) {
            const cache = this.workingCombinations.filter((c) => {
                return !this.equalsAllElements(c, target);
            });

            this.workingCombinations = cache;
        }
    }

    removeFromAll(target: Map<Key, Value>): void {
        if (this.allCombinations.length !== 1) {
            const cache = this.allCombinations.filter((c) => {
                return !this.equalsAllElements(c, target);
            });

            this.allCombinations = cache;
        }
    }

    equalsAllElements(
        target1: Map<Key, Value>,
        target2: Map<Key, Value>
    ): boolean {
        if (target1 === undefined || target2 === undefined) {
            return target1 === target2;
        }

        if (target1.size !== target2.size) {
            return false;
        }

        const keys = Array.from(target1.keys());

        return (
            keys.filter((k) => {
                return target1.get(k) !== target2.get(k);
            }).length === 0
        );
    }
}
