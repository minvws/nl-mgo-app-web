import { expectJson, testUiSchemaContext } from '$test';
import { type Flag } from 'fhir/r3';
import { test } from 'vitest';
import input from './fixtures/zib-Alert-01.json';
import { zibAlert } from './zibAlert';

const zibData = zibAlert.parse(input as Flag);

test('uiSchema returns the expected output', () => {
    const uiSchema = zibAlert.uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/zib-Alert-01-uiSchema.snap.json');
});
