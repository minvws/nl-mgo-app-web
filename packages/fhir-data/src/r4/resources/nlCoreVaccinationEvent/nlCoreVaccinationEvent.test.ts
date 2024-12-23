import { expectJson, testUiSchemaContext, faker } from '$test';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { type Immunization } from 'fhir/r4';
import { r4NlCoreVaccinationEvent } from './nlCoreVaccinationEvent';

test('returns the expected output 01', () => {
    const output = r4NlCoreVaccinationEvent.parse(
        input01 as Immunization,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', () => {
    const output = r4NlCoreVaccinationEvent.parse(
        input02 as Immunization,
        faker.custom.i18nContext()
    );
    expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = r4NlCoreVaccinationEvent.parse(
        input01 as Immunization,
        faker.custom.i18nContext()
    );
    const uiSchema = r4NlCoreVaccinationEvent.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', () => {
    const output = r4NlCoreVaccinationEvent.parse(
        input02 as Immunization,
        faker.custom.i18nContext()
    );
    const uiSchema = r4NlCoreVaccinationEvent.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});
