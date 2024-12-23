import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { batch } from './batch';
import { message } from '$test/i18n';

test('batch parses successfully', () => {
    const input = {
        lotNumber: faker.string.numeric(12),
        expirationDate: faker.date.anytime().toString(),
    };
    const data = batch.parse(input);
    expect(data).toEqual(
        expect.objectContaining({
            lotNumber: input.lotNumber,
            expirationDate: input.expirationDate,
        })
    );
});

test('batch UI schema group is created successfully', () => {
    const input = {
        lotNumber: faker.string.numeric(12),
        expirationDate: faker.date.anytime().toString(),
    };
    const data = batch.parse(input);
    const schema = batch.uiSchemaGroup(data, testUiSchemaContext());
    expect(schema.label).toBe(message('r4.zib_pharmaceutical_product.batch'));
});
