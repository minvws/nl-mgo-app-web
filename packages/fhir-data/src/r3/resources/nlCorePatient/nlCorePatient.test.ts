import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Patient } from 'fhir/r3';
import { expect, test } from 'vitest';
import input01 from './fixtures/nl-core-Patient-01.json';
import { nlCorePatient } from './nlCorePatient';
import { i18n } from './uiSchema';

test('parseNlCorePatient returns the expected output 01', async () => {
    const output = nlCorePatient.parse(input01 as Patient);
    await expectJson(output).toMatchFileSnapshot('./fixtures/nl-core-Patient-01-output.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const output = nlCorePatient.parse(input01 as Patient);
    const zibUiSchema = nlCorePatient.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/nl-core-Patient-01-uiSchema.snap.json'
    );
});

test('uiSchema returns default label if name not supplied', () => {
    const output = nlCorePatient.parse(input01 as Patient);
    output.name = undefined;
    const uiSchema = nlCorePatient.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
