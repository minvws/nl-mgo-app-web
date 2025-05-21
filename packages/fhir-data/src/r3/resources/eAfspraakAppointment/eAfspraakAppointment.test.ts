import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type Appointment } from 'fhir/r3';
import { test } from 'vitest';
import { eAfspraakAppointment } from './eAfspraakAppointment';
import input1 from './fixtures/01/fhir-resource.json';
import input2 from './fixtures/02/fhir-resource.json';

test('01: mgo-resource', async () => {
    const output = eAfspraakAppointment.parse(input1 as Appointment);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = eAfspraakAppointment.parse(input1 as Appointment);
    const uiSchema = eAfspraakAppointment.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = eAfspraakAppointment.parse(input2 as Appointment);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = eAfspraakAppointment.parse(input2 as Appointment);
    const uiSchema = eAfspraakAppointment.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
