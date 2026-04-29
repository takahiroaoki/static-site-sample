export function lengthValidationFunc(min: number, max: number): (value: string) => Error|null {
    return (value: string) => {
        if (value.length < min) {
            return new Error(`length must be at least ${min} characters`);
        }
        if (value.length > max) {
            return new Error(`length must be at most ${max} characters`);
        }
        return null;
    };
}