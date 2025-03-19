import { expectJson, testUiSchemaContext } from '$test';
import { type Practitioner } from 'fhir/r3';
import { test } from 'vitest';
import input01 from './fixtures/01/fhir-resource.json';
import input02 from './fixtures/02/fhir-resource.json';
import input03 from './fixtures/03/fhir-resource.json';
import input04 from './fixtures/04/fhir-resource.json';
import { nlCorePractitioner } from './nlCorePractitioner';

test('returns the expected output 01', async () => {
    const output = nlCorePractitioner.parse(input01 as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/01/mgo-resource.snap.json');
});

test('returns the expected output 02', async () => {
    const output = nlCorePractitioner.parse(input02 as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/02/mgo-resource.snap.json');
});

test('returns the expected output 03', async () => {
    const output = nlCorePractitioner.parse(input03 as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/03/mgo-resource.snap.json');
});

test('returns the expected output 04', async () => {
    const output = nlCorePractitioner.parse(input04 as Practitioner);
    await expectJson(output).toMatchFileSnapshot('./fixtures/04/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = nlCorePractitioner.parse(input01 as Practitioner);
    const uiSchema = nlCorePractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/01/ui-schema.snap.json');
});

test('uiSchema returns the expected output 02', async () => {
    const output = nlCorePractitioner.parse(input02 as Practitioner);
    const uiSchema = nlCorePractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/02/ui-schema.snap.json');
});

test('uiSchema returns the expected output 03', async () => {
    const output = nlCorePractitioner.parse(input03 as Practitioner);
    const uiSchema = nlCorePractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/03/ui-schema.snap.json');
});

test('uiSchema returns the expected output 04', async () => {
    const output = nlCorePractitioner.parse(input04 as Practitioner);
    const uiSchema = nlCorePractitioner.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/04/ui-schema.snap.json');
});
