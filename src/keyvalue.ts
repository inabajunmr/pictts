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
    value: string;
    private static cache = new Map<string, Value>();
    private constructor(value: string) {
        this.value = value;
    }

    static of(value: string): Value {
        if (this.cache.has(value)) {
            return this.cache.get(value) as Value;
        }
        const k = new Value(value);
        this.cache.set(value, k);
        return k;
    }
}

export function map(key: string, value: string): Map<Key, Value> {
    return new Map().set(Key.of(key), Value.of(value));
}

export function map2(
    k1: string,
    v1: string,
    k2: string,
    v2: string
): Map<Key, Value> {
    const result = new Map<Key, Value>();
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
): Map<Key, Value> {
    const result = new Map<Key, Value>();
    result.set(Key.of(k1), Value.of(v1));
    result.set(Key.of(k2), Value.of(v2));
    result.set(Key.of(k3), Value.of(v3));
    return result;
}
