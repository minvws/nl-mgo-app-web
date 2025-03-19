import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { type Immunization } from 'fhir/r4';
import { expect, test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { r4NlCoreVaccinationEvent } from './nlCoreVaccinationEvent';
import { i18n } from './uiSchema';

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

test('01 - ui-schema - has a label even when there is no vaccine code', () => {
    const resource = r4NlCoreVaccinationEvent.parse({
        meta: {
            profile: [r4NlCoreVaccinationEvent.profile],
        },
    } as Immunization);

    const schema = r4NlCoreVaccinationEvent.uiSchema(
        resource,
        testUiSchemaContext({ useMock: true })
    );

    expect(schema.label).toBe(testMessage(i18n));
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
