import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Patient } from 'fhir/r4';
import { expect, test } from 'vitest';
import input01 from './fixtures/fhir-resource.json';
import { r4NlCorePatient } from './nlCorePatient';
import { i18n } from './uiSchema';

test('parseNlCorePatient returns the expected output 01', async () => {
    const output = r4NlCorePatient.parse(input01 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const zibData = r4NlCorePatient.parse(input01 as Patient);
    const zibUiSchema = r4NlCorePatient.uiSchema(
        zibData,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(zibUiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('uiSchema returns default label if name not supplied', () => {
    const output = r4NlCorePatient.parse(input01 as Patient);
    output.name = undefined;
    const uiSchema = r4NlCorePatient.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
