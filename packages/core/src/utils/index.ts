export function ensure<T>(value: T | undefined): T {
    if (value === undefined) throw new Error('Value provided is undefined');

    return value;
}
