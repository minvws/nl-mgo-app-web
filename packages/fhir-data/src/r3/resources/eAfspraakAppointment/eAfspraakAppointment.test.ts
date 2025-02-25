import { expectJson, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Appointment } from 'fhir/r3';
import { expect, test } from 'vitest';
import { eAfspraakAppointment } from './eAfspraakAppointment';
import input1 from './fixtures/01/fhir-resource.json';
import { i18n } from './uiSchema';

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

test('uiSchema returns default label if description not supplied', () => {
    const output = eAfspraakAppointment.parse(input1 as Appointment);
    output.description = undefined;
    const uiSchema = eAfspraakAppointment.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
