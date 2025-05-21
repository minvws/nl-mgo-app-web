import { expectHealthCareUiSchemaJson, expectJson, faker, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Medication } from 'fhir/r4';
import { expect, test } from 'vitest';
import { parse } from '../../../parse';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { nlCorePharmaceuticalProductR4 } from './nlCorePharmaceuticalProduct';
import { i18n } from './uiSchema';

test('returns the expected output 01', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input01 as Medication);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input01 as Medication);
    const uiSchema = nlCorePharmaceuticalProductR4.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('returns the expected output 02', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input02 as Medication);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', async () => {
    const output = nlCorePharmaceuticalProductR4.parse(input02 as Medication);
    const uiSchema = nlCorePharmaceuticalProductR4.uiSchema(output, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('uiSchema label returns profile when label not specified', () => {
    const output = nlCorePharmaceuticalProductR4.parse(input01 as Medication);
    output.name = undefined;
    const uiSchema = nlCorePharmaceuticalProductR4.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toEqual(fhirMessage(i18n));
});

test('return batch lotnumber if specified', () => {
    const lotNumber = faker.string.numeric(8);
    const input = input01 as Medication;
    input.batch = {
        lotNumber: lotNumber,
    };
    const output = nlCorePharmaceuticalProductR4.parse(input);
    expect(output.batch.lotNumber).toEqual(parse.string(lotNumber));
});
