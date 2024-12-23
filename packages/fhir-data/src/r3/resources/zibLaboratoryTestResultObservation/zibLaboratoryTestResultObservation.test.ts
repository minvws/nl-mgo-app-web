import { expectJson, testUiSchemaContext, faker } from '$test';
import { expect, test } from 'vitest';
import { type Observation } from 'fhir/r3';
import { zibLaboratoryTestResultObservation } from './zibLaboratoryTestResultObservation';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';

test('returns the expected output 01', () => {
    const output = zibLaboratoryTestResultObservation.parse(
        input01 as Observation,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = zibLaboratoryTestResultObservation.parse(
        input01 as Observation,
        faker.custom.i18nContext()
    );
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('returns the expected output 02', () => {
    const output = zibLaboratoryTestResultObservation.parse(
        input02 as Observation,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibLaboratoryTestResultObservation.parse(
        input02 as Observation,
        faker.custom.i18nContext()
    );
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = zibLaboratoryTestResultObservation.parse(
        input02 as Observation,
        faker.custom.i18nContext()
    );
    output.laboratoryTestResultCode = [
        {
            text: undefined,
            coding: [
                {
                    system: 'http://snomed.info/sct',
                    code: '49581000146104',
                    display: 'bevinding betreffende laboratoriumonderzoek',
                },
            ],
        },
    ];
    const uiSchema = zibLaboratoryTestResultObservation.uiSchema(output, testUiSchemaContext());
    expect(uiSchema.label).toBe('bevinding betreffende laboratoriumonderzoek');
});
