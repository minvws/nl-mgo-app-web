import { expect, test } from 'vitest';
import { type Quantity } from '../../fhir';
import { quantityToString } from './quantityToString';

test.each<[Quantity | undefined, string]>([
    [{ value: 1, unit: 'unit' }, '1 unit'],
    [{ value: -1, unit: 'unit' }, '-1 unit'],
    [{ value: 1 }, '1'],
    [{ value: -1 }, '-1'],
    [{ unit: 'unit' }, '- unit'],
    [undefined, ''],
])('quantityToString correctly transforms Quantity %j to %j', (quantity, expected) => {
    expect(quantityToString(quantity)).toEqual(expected);
});
