export class KeyValuePair {
    public readonly key: string;
    public readonly value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    includes(value: string): boolean {
        return this.value.toLowerCase().includes(value.toLowerCase());
    }
}