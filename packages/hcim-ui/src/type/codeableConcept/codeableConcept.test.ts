import { faker } from '$test';
import { MgoCodingProps, type MgoCodeableConcept } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test, vi } from 'vitest';
import { type UiContext } from '../../context/index.js';
import { codeableConcept } from './codeableConcept.js';

vi.mock('../../format/system/system', () => ({
    system: vi.fn((_context: UiContext) =>
        vi.fn((value: MgoCodingProps) => `system(${value.display})`)
    ),
}));

test('codeableConcept formats coding values', () => {
    const label = faker.custom.fhirMessageId();

    const concept: MgoCodeableConcept = {
        _type: 'codeableConcept',
        coding: [faker.fhir.coding(), faker.fhir.coding()],
        text: undefined,
    };

    const result = codeableConcept(faker.ui.context())(label, concept);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: [
            {
                display: `system(${concept.coding[0].display})`,
                code: concept.coding[0].code,
                system: concept.coding[0].system,
            },
            {
                display: `system(${concept.coding[1].display})`,
                code: concept.coding[1].code,
                system: concept.coding[1].system,
            },
        ],
    });
});

test('codeableConcept handles array of concepts', () => {
    const label = faker.custom.fhirMessageId();

    const concepts: MgoCodeableConcept[] = [
        {
            _type: 'codeableConcept',
            coding: [faker.fhir.coding()],
            text: undefined,
        },
        {
            _type: 'codeableConcept',
            coding: [faker.fhir.coding()],
            text: undefined,
        },
    ];

    const result = codeableConcept(faker.ui.context())(label, concepts);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_GROUPED_VALUES',
        display: [
            [
                {
                    display: `system(${concepts[0].coding[0].display})`,
                    code: concepts[0].coding[0].code,
                    system: concepts[0].coding[0].system,
                },
            ],
            [
                {
                    display: `system(${concepts[1].coding[0].display})`,
                    code: concepts[1].coding[0].code,
                    system: concepts[1].coding[0].system,
                },
            ],
        ],
    });
});
