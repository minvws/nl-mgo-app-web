import input1 from './fixtures/01/fhir-resource.json';

import { expectJson, testUiSchemaContext } from '$test';
import { test } from 'vitest';
import { type Appointment } from 'fhir/r3';
import { eAfspraakAppointment } from './eAfspraakAppointment';

test('returns the expected output 01', () => {
    const output = eAfspraakAppointment.parse(input1 as Appointment);
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema 01 returns the expected output', () => {
    const output = eAfspraakAppointment.parse(input1 as Appointment);
    const uiSchema = eAfspraakAppointment.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});
