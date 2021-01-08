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
