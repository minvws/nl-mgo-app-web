import input01 from './fixtures/fhir-resource.json';

import { expectJson, faker } from '$test';
import { expect, test } from 'vitest';
import { type Observation } from '../../fhir';
import { coding } from '../../parse/type';
import { map } from '../../utils';
import { gpJournalEntry } from './gpJournalEntry';

test('returns the expected output 01', () => {
    const output = gpJournalEntry.parse(input01 as Observation);
    expectJson(output).toMatchFileSnapshot('./fixtures/mgo-resource.snap.json');
});

test('uiSchema returns the expected output 01', () => {
    const output = gpJournalEntry.parse(input01 as Observation);
    const uiSchema = gpJournalEntry.uiSchema(output);
    expectJson(uiSchema).toMatchFileSnapshot('./fixtures/ui-schema.snap.json');
});

test('returns ICPC_E in parser', () => {
    const valueCodeableConcept = [faker.fhir.coding()];
    const input = input01 as Observation;
    input.component?.push({
        code: {
            coding: [
                {
                    system: 'http://hl7.org/fhir/v3/ActCode',
                    code: 'DISDX',
                    display: 'discharge diagnosis',
                },
            ],
        },
        valueCodeableConcept: {
            coding: valueCodeableConcept,
        },
    });

    const output = gpJournalEntry.parse(input);
    expect(output.ICPC_E).toEqual({
        valueCodeableConcept: map(valueCodeableConcept, coding),
    });
});
