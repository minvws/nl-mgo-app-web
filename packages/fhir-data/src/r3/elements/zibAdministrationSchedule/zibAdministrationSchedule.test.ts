import { expectJson, faker, testUiSchemaContext } from '$test';
import { type Timing } from 'fhir/r3';
import { expect, test } from 'vitest';
import { parse } from '../../../parse';
import inputFhirData from './fixtures/fhir-resource.json';
import { uiSchemaGroup } from './uiSchemaGroup';
import { zibAdministrationSchedule } from './zibAdministrationSchedule';

test('zibInstructionsForUse returns the expected output', async () => {
    const output = zibAdministrationSchedule.parse(inputFhirData as Timing);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const zibData = zibAdministrationSchedule.parse(inputFhirData as Timing);
    const schema = uiSchemaGroup(zibData, testUiSchemaContext());
    await expectJson(schema).toMatchFileSnapshot('./fixtures/ui-schema-group.snap.json');
});

test('zibAdministrationSchedule parses successfully', () => {
    const data = faker.fhir.timing();
    const zibData = zibAdministrationSchedule.parse(data);
    expect(zibData.repeat).toEqual(
        expect.objectContaining({
            duration: parse.decimal(data.repeat?.duration),
        })
    );
});

test('zibAdministrationSchedule parses successfully when there data is undefined', () => {
    const data = undefined;
    const zibData = zibAdministrationSchedule.parse(data);
    expect(zibData.repeat).toEqual(
        expect.objectContaining({
            duration: undefined,
        })
    );
});
