import { expectJson, faker, testUiSchemaContext } from '$test';
import { type Dosage } from 'fhir/r3';
import { expect, test } from 'vitest';
import { parse } from '../../../parse';
import inputFhirData from './fixtures/fhir-resource.json';
import { uiSchemaGroup } from './uiSchemaGroup';
import { zibInstructionsForUse } from './zibInstructionsForUse';

test('zibInstructionsForUse returns the expected output', () => {
    const output = zibInstructionsForUse.parse(inputFhirData as Dosage);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', () => {
    const zibData = zibInstructionsForUse.parse(inputFhirData as Dosage);
    const zibMedicationUseUiSchema = uiSchemaGroup(zibData, testUiSchemaContext());
    expectJson(zibMedicationUseUiSchema).toMatchFileSnapshot(
        './fixtures/ui-schema-group.snap.json'
    );
});

test('zibInstructionsForUse parses successfully', () => {
    const data = faker.fhir.dosage();
    const schema = zibInstructionsForUse.parse(data);
    expect(schema).toEqual(
        expect.objectContaining({
            asNeeded: parse.codeableConcept(data.asNeededCodeableConcept),
        })
    );
});
