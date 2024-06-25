import { expect, test, vi } from 'vitest';
import { useTranslateDescriptions } from './useTranslateDescriptions';
import { faker } from '@faker-js/faker';

vi.mock('@lingui/react', () => ({
    useLingui: vi.fn(() => ({
        _: vi.fn((x) => x.id),
    })),
}));

test.each([undefined, null])('translateDescriptions: returns unknown when input "%s"', (value) => {
    const { translateDescriptions } = useTranslateDescriptions();
    const descriptions = translateDescriptions([
        {
            term: {
                id: 'term',
                message: 'term',
            },
            details: value,
        },
    ]);

    expect(descriptions[0].details).toEqual('fhir.unknown');
});

test.each([faker.lorem.word(), 'true', 'false', faker.number.int()])(
    'translateDescriptions: returns value when input "%s"',
    (value) => {
        const { translateDescriptions } = useTranslateDescriptions();
        const descriptions = translateDescriptions([
            {
                term: {
                    id: 'term',
                    message: 'term',
                },
                details: value,
            },
        ]);

        expect(descriptions[0].details).toEqual(value);
    }
);
