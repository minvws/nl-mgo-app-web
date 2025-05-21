import { expectHealthCareUiSchemaJson, expectJson, testUiSchemaContext } from '$test';
import { type EpisodeOfCare } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import { nlCoreEpisodeofcare } from './nlCoreEpisodeofcare';

test('01: mgo-resource', async () => {
    const mgoResource = nlCoreEpisodeofcare.parse(input01 as EpisodeOfCare);
    await expectJson(mgoResource).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const mgoResource = nlCoreEpisodeofcare.parse(input01 as EpisodeOfCare);
    const uiSchema = nlCoreEpisodeofcare.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const mgoResource = nlCoreEpisodeofcare.parse(input02 as EpisodeOfCare);
    await expectJson(mgoResource).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const mgoResource = nlCoreEpisodeofcare.parse(input02 as EpisodeOfCare);
    const uiSchema = nlCoreEpisodeofcare.uiSchema(mgoResource, testUiSchemaContext());
    await expectHealthCareUiSchemaJson(uiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});
