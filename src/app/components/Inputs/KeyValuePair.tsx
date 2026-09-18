export class KeyValuePair {
    key: string;
    value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    getValue(): string {
        return this.value.toLowerCase();
    }

    getKey(): string {
        return this.key;
    }

    includes(value: string): boolean {
        return this.getValue().includes(value.toLowerCase());
    }
}