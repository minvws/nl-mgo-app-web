import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { type MgoCodeableConcept } from '../../../parse/type';
import { type UiHelperContext } from '../../context';
import { system } from '../../format/system/system';
import { codeableConcept } from './codeableConcept';

const mockSystem = system as unknown as MockedFunction<typeof system>;

vi.mock('../../format/system/system', () => ({
    system: vi.fn((_context: UiHelperContext) => vi.fn(() => 'system')),
}));

test('codeableConcept prefers text value', () => {
    const label = faker.custom.fhirMessageId();

    const concept: MgoCodeableConcept = {
        _type: 'codeableConcept',
        text: faker.lorem.sentence(),
        coding: [
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
        ],
    };

    const result = codeableConcept(faker.custom.uiHelperContext())(label, concept);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: [concept.text],
    });
});

test('codeableConcept uses conding values as fallback', () => {
    const label = faker.custom.fhirMessageId();

    const concept: MgoCodeableConcept = {
        _type: 'codeableConcept',
        text: undefined,
        coding: [
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
            {
                code: faker.fhir.code(),
                system: faker.internet.url(),
                display: faker.lorem.sentence(),
            },
        ],
    };

    const mockFormatSystem = vi.fn(() => 'system');
    mockSystem.mockReturnValue(mockFormatSystem);

    const result = codeableConcept(faker.custom.uiHelperContext())(label, concept);

    expect(result).toEqual({
        label: testMessage(label),
        type: 'MULTIPLE_VALUES',
        display: ['system', 'system'],
    });

    expect(mockFormatSystem).toHaveBeenNthCalledWith(1, concept.coding[0], 0, concept.coding);
    expect(mockFormatSystem).toHaveBeenNthCalledWith(2, concept.coding[1], 1, concept.coding);
});
