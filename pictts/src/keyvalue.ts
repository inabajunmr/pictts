export class Key {
    key: string;
    static cache = new Map<string, Key>();
    private constructor(key: string) {
        this.key = key;
    }

    static of(key: string): Key {
        if (this.cache.has(key)) {
            return this.cache.get(key) as Key;
        }
        const k = new Key(key);
        this.cache.set(key, k);
        return k;
    }
}

export class Value {
    type: ValueType;
    value: string;
    private static stringCache = new Map<string, Value>();
    private static numberCache = new Map<string, Value>();
    private constructor(value: string, type: ValueType = 'string') {
        this.value = value;
        this.type = type;
    }

    static of(value: string, type: ValueType = 'string'): Value {
        if (type === 'string') {
            if (this.stringCache.has(value)) {
                return this.stringCache.get(value) as Value;
            }
            const k = new Value(value);
            this.stringCache.set(value, k);
            return k;
        } else {
            if (this.numberCache.has(value)) {
                return this.numberCache.get(value) as Value;
            }
            const k = new Value(value, 'number');
            this.numberCache.set(value, k);
            return k;
        }
    }
}

export type ValueType = 'string' | 'number';

export class KeyValueMap extends Map<Key, Value> {
    equals(m: KeyValueMap): boolean {
        if (this.size !== m.size) {
            return false;
        }

        const result = Array.from(this.keys()).reduce(
            (acc, key) => acc && this.get(key) == m.get(key),
            true
        );

        return result;
    }

    /**
     * All this keyvalue contains argument.
     * this:{'A':'A1', 'B':'B1'}, argument:{'A':'A1', 'B':'B1'}, true
     * this:{'A':'A1', 'B':'B1'}, argument:{'A':'A1', 'B':'B1', 'C':'C1'}, true
     * this:{'A':'A1', 'B':'B1'}, argument:{'A':'A1', 'B':'B2', 'C':'C1'}, false
     * this:{'A':'A1', 'B':'B1'}, argument:{'A':'A1'}, false
     * @param m
     */
    contains(m: KeyValueMap): boolean {
        const result = Array.from(this.entries()).reduce((acc, kv) => {
            return acc && kv[1] === m.get(kv[0]);
        }, true);
        return result;
    }

    toString(): string {
        return Array.from(this.entries())
            .map((kv) => {
                return `${kv[0].key}:${kv[1].value}`;
            })
            .join(',');
    }
}

/**
 * contains keys1 in keys2
 * keys1:['a','b','c'], keys2:['a','b','c'] true
 * keys1:['a','b','c'], keys2:['a','b','c','d'] true
 * keys1:['a','b','c'], keys2:['a','b'] false
 * @param keys1
 * @param keys2
 */
export function containsKey1InKey2(keys1: Key[], keys2: Key[]): boolean {
    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let index = 0; index < keys1.length; index++) {
        if (keys1[index] !== keys2[index]) {
            return false;
        }
    }

    return true;
}

export function map(key: string, value: string): KeyValueMap {
    new Map();
    const result = new KeyValueMap();
    result.set(Key.of(key), Value.of(value));
    return result;
}

export function map2(
    k1: string,
    v1: string,
    k2: string,
    v2: string
): KeyValueMap {
    const result = new KeyValueMap();
    result.set(Key.of(k1), Value.of(v1));
    result.set(Key.of(k2), Value.of(v2));
    return result;
}

export function map3(
    k1: string,
    v1: string,
    k2: string,
    v2: string,
    k3: string,
    v3: string
): KeyValueMap {
    const result = new KeyValueMap();
    result.set(Key.of(k1), Value.of(v1));
    result.set(Key.of(k2), Value.of(v2));
    result.set(Key.of(k3), Value.of(v3));
    return result;
}
