import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { type Appointment } from '@minvws/mgo-fhir/r3';
import { fhirMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { eAfspraakAppointment } from './eAfspraakAppointment.js';
import input1 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input2 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input3 from './fixtures/03/fhir-resource.json' with { type: 'json' };

test('01: mgo-resource', async () => {
    const output = eAfspraakAppointment.parse(input1 as Appointment);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = eAfspraakAppointment.parse(input1 as Appointment);
    const uiSchema = eAfspraakAppointment.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('01: summary', async () => {
    const output = eAfspraakAppointment.parse(input1 as Appointment);
    const uiSchema = eAfspraakAppointment.summary(
        output,
        testSchemaContext({
            isSummary: true,
            organization: {
                name: 'test-organization',
            },
        })
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = eAfspraakAppointment.parse(input2 as Appointment);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = eAfspraakAppointment.parse(input2 as Appointment);
    const uiSchema = eAfspraakAppointment.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02: summary', async () => {
    const output = eAfspraakAppointment.parse(input2 as Appointment);
    const uiSchema = eAfspraakAppointment.summary(
        output,
        testSchemaContext({
            isSummary: true,
            organization: {
                name: 'test-organization',
            },
        })
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});

test('03: mgo-resource', async () => {
    const output = eAfspraakAppointment.parse(input3 as Appointment);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03: ui-schema', async () => {
    const mgoResource = eAfspraakAppointment.parse(input3 as Appointment);
    const uiSchema = eAfspraakAppointment.uiSchema(mgoResource, testSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('03: summary', async () => {
    const output = eAfspraakAppointment.parse(input3 as Appointment);
    const uiSchema = eAfspraakAppointment.summary(
        output,
        testSchemaContext({
            isSummary: true,
            organization: {
                name: 'test-organization',
            },
        })
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/summary.snap.json'
    );
});

test('03: summary label defaults to standard resource label when there is no code', async () => {
    const mgoResource = eAfspraakAppointment.parse(input3 as Appointment);
    if (mgoResource.appointmentType) {
        mgoResource.appointmentType.text = undefined;
    }

    const schema = eAfspraakAppointment.summary(
        mgoResource,
        testSchemaContext({ isSummary: true })
    );
    expect(schema.label).toEqual(fhirMessage('r3.e_afspraak_appointment'));
});
