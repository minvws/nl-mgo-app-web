import { expectJson, faker, testSchemaContext } from '$test';
import { type Timing } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { expect, test } from 'vitest';
import inputFhirData from './fixtures/fhir-resource.json' with { type: 'json' };
import { uiSchemaGroup } from './uiSchemaGroup.js';
import { zibAdministrationSchedule } from './zibAdministrationSchedule.js';

test('zibInstructionsForUse returns the expected output', async () => {
    const output = zibAdministrationSchedule.parse(inputFhirData as Timing);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output', async () => {
    const zibData = zibAdministrationSchedule.parse(inputFhirData as Timing);
    const schema = uiSchemaGroup(zibData, testSchemaContext());
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
