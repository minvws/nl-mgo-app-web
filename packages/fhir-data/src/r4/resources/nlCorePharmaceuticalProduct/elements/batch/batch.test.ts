import { faker, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test } from 'vitest';
import { parse } from '../../../../../parse';
import { batch } from './batch';

test('batch parses successfully', () => {
    const input = {
        lotNumber: faker.string.numeric(12),
        expirationDate: faker.date.anytime().toString(),
    };
    const data = batch.parse(input);
    expect(data).toEqual(
        expect.objectContaining({
            lotNumber: parse.string(input.lotNumber),
            expirationDate: parse.dateTime(input.expirationDate),
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
    expect(schema.label).toBe(fhirMessage('r4.zib_pharmaceutical_product.batch'));
});
