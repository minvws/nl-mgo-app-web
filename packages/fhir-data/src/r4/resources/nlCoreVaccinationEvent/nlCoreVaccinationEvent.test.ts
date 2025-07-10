import { expectHealthCareUiSchemaJson, expectJson, faker, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-intl/test';
import { type Immunization } from 'fhir/r4';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import { r4NlCoreVaccinationEvent } from './nlCoreVaccinationEvent';
import { i18n } from './summary';

test('01 - mgo-resource', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input01 as Immunization);
    await expectJson(mgoResource).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01 - ui-schema', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input01 as Immunization);
    const uiSchema = r4NlCoreVaccinationEvent.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('01 - summary', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input01 as Immunization);
    const uiSchema = r4NlCoreVaccinationEvent.summary(
        mgoResource,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/summary.snap.json'
    );
});

test('01 - summary - has a label even when there is no vaccine code', () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input01 as Immunization);
    mgoResource.vaccineCode = {
        _type: 'codeableConcept',
        text: faker.lorem.sentence(),
        coding: [
            {
                code: '4',
                display: undefined,
                system: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.40.2.14.3.2',
            },
        ],
    };
    const uiSchema = r4NlCoreVaccinationEvent.summary(
        mgoResource,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});

test('02 - mgo-resource', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input02 as Immunization);
    await expectJson(mgoResource).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02 - ui-schema', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input02 as Immunization);
    const uiSchema = r4NlCoreVaccinationEvent.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('02 - summary', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input02 as Immunization);
    const uiSchema = r4NlCoreVaccinationEvent.summary(
        mgoResource,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/summary.snap.json'
    );
});

test('03 - mgo-resource', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input03 as Immunization);
    await expectJson(mgoResource).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03 - ui-schema', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input03 as Immunization);
    const uiSchema = r4NlCoreVaccinationEvent.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('03 - summary', async () => {
    const mgoResource = r4NlCoreVaccinationEvent.parse(input02 as Immunization);
    const uiSchema = r4NlCoreVaccinationEvent.summary(
        mgoResource,
        testUiSchemaContext({
            isSummary: true,
        })
    );
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/03/summary.snap.json'
    );
});
