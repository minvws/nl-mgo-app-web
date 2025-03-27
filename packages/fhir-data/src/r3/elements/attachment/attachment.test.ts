import { faker, testUiSchemaContext } from '$test';
import { expect, test } from 'vitest';
import { uiSchemaGroup } from './uiSchemaGroup';

test('parses successfully', () => {
    const data = faker.mgo.attachment();
    const schema = uiSchemaGroup(
        data,
        testUiSchemaContext({
            useMock: true,
            ignoreMissingTranslations: true,
        })
    );
    expect(schema).toEqual(
        expect.objectContaining({
            label: 'r3.attachment',
        })
    );
});
