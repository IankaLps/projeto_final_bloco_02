export class NumericTransformer {
    to(data: number): number {
        return data;
    }

    from(data: string): number {
        return parseFloat(parseFloat(data).toFixed(2));
    }
}