import { expectJson, faker, testUiSchemaContext } from '$test';
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';
import { type Observation } from 'fhir/r3';
import { expect, test } from 'vitest';
import { codeableConcept } from '../../../parse/type';
import input01 from './fixtures/fhir-resource.json';
import { gpJournalEntry } from './gpJournalEntry';
import { i18n } from './uiSchema';

test('returns the expected output 01', async () => {
    const output = gpJournalEntry.parse(input01 as Observation);
    await expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', async () => {
    const output = gpJournalEntry.parse(input01 as Observation);
    const uiSchema = gpJournalEntry.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    await expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('returns ICPC_E in parser', () => {
    const coding = [faker.fhir.coding()];
    const input = input01 as Observation;
    input.component?.push({
        code: {
            coding: [
                {
                    system: 'http://hl7.org/fhir/v3/ActCode', // NOSONAR
                    code: 'DISDX',
                    display: 'discharge diagnosis',
                },
            ],
        },
        valueCodeableConcept: {
            coding,
        },
    });

    const output = gpJournalEntry.parse(input);
    expect(output.ICPC_E).toEqual({
        valueCodeableConcept: codeableConcept({
            text: undefined,
            coding,
        }),
    });
});

test('uiSchema returns default label if context not supplied', () => {
    const output = gpJournalEntry.parse(input01 as Observation);
    output.context = undefined;
    const uiSchema = gpJournalEntry.uiSchema(
        output,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    expect(uiSchema.label).toBe(fhirMessage(i18n));
});
