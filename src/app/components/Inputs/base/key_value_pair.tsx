export class KeyValuePair {
    private readonly key: string;
    private readonly value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    public get Value(): string {
        return this.value;
    }

    public get Key(): string {
        return this.key;
    }

    includes(value: string): boolean {
        return this.value.includes(value.toLowerCase());
    }
}