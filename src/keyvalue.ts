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
