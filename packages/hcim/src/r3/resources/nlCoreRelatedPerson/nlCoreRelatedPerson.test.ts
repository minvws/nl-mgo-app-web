import { expectHealthCareUiSchemaJson, expectJson, testSchemaContext } from '$test';
import { RelatedPerson } from '@minvws/mgo-fhir/r3';
import { test } from 'vitest';
import { nlCoreRelatedPerson } from '././nlCoreRelatedPerson.js';
import input01 from './fixtures/01/fhir-resource.json' with { type: 'json' };
import input02 from './fixtures/02/fhir-resource.json' with { type: 'json' };
import input03 from './fixtures/03/fhir-resource.json' with { type: 'json' };
import input04 from './fixtures/04/fhir-resource.json' with { type: 'json' };
import input05 from './fixtures/05/fhir-resource.json' with { type: 'json' };
import input06 from './fixtures/06/fhir-resource.json' with { type: 'json' };
import input07 from './fixtures/07/fhir-resource.json' with { type: 'json' };

test('01: mgo-resource', async () => {
    const output = nlCoreRelatedPerson.parse(input01 as RelatedPerson);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('01: ui-schema', async () => {
    const output = nlCoreRelatedPerson.parse(input01 as RelatedPerson);
    const zibUiSchema = nlCoreRelatedPerson.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/01/ui-schema.snap.json'
    );
});

test('02: mgo-resource', async () => {
    const output = nlCoreRelatedPerson.parse(input02 as RelatedPerson);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('02: ui-schema', async () => {
    const output = nlCoreRelatedPerson.parse(input02 as RelatedPerson);
    const zibUiSchema = nlCoreRelatedPerson.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/02/ui-schema.snap.json'
    );
});

test('03: mgo-resource', async () => {
    const output = nlCoreRelatedPerson.parse(input03 as RelatedPerson);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('03: ui-schema', async () => {
    const output = nlCoreRelatedPerson.parse(input03 as RelatedPerson);
    const zibUiSchema = nlCoreRelatedPerson.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/03/ui-schema.snap.json'
    );
});

test('04: mgo-resource', async () => {
    const output = nlCoreRelatedPerson.parse(input04 as RelatedPerson);
    await expectJson(output).toMatchFileSnapshot('./fixtures/04/mgo-resource.snap.json');
});

test('04: ui-schema', async () => {
    const output = nlCoreRelatedPerson.parse(input04 as RelatedPerson);
    const zibUiSchema = nlCoreRelatedPerson.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/04/ui-schema.snap.json'
    );
});

test('05: mgo-resource', async () => {
    const output = nlCoreRelatedPerson.parse(input05 as RelatedPerson);
    await expectJson(output).toMatchFileSnapshot('./fixtures/05/mgo-resource.snap.json');
});

test('05: ui-schema', async () => {
    const output = nlCoreRelatedPerson.parse(input05 as RelatedPerson);
    const zibUiSchema = nlCoreRelatedPerson.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/05/ui-schema.snap.json'
    );
});

test('06: mgo-resource', async () => {
    const output = nlCoreRelatedPerson.parse(input06 as RelatedPerson);
    await expectJson(output).toMatchFileSnapshot('./fixtures/06/mgo-resource.snap.json');
});

test('06: ui-schema', async () => {
    const output = nlCoreRelatedPerson.parse(input06 as RelatedPerson);
    const zibUiSchema = nlCoreRelatedPerson.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/06/ui-schema.snap.json'
    );
});

test('07: mgo-resource', async () => {
    const output = nlCoreRelatedPerson.parse(input07 as RelatedPerson);
    await expectJson(output).toMatchFileSnapshot('./fixtures/07/mgo-resource.snap.json');
});

test('07: ui-schema', async () => {
    const output = nlCoreRelatedPerson.parse(input07 as RelatedPerson);
    const zibUiSchema = nlCoreRelatedPerson.uiSchema(output, testSchemaContext());
    await expectHealthCareUiSchemaJson(zibUiSchema).toMatchFileSnapshot(
        './fixtures/07/ui-schema.snap.json'
    );
});
