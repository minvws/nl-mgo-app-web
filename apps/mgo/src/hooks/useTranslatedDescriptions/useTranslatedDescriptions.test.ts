import { expect, test, vi } from 'vitest';
import { useTranslatedDescriptions } from './useTranslatedDescriptions';

vi.mock('react-intl');
vi.mock('react', (importActual) => ({
    ...importActual,
    useCallback: vi.fn((fn) => fn),
    useMemo: vi.fn((fn) => fn()),
}));

test('returns descriptions, with the original key and value, in the specified order', () => {
    const value = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
    };
    const { results } = useTranslatedDescriptions([value], ['key2', 'key1']);

    expect(results[0].descriptions).toEqual([
        {
            key: 'key2',
            value: 'value2',
            term: 'fhir.key2',
            details: 'value2',
        },
        {
            key: 'key1',
            value: 'value1',
            term: 'fhir.key1',
            details: 'value1',
        },
    ]);
});

test('returns descriptions, with "unknown" details if value was null or undefined', () => {
    const value = {
        key1: 'value1',
        key2: undefined,
        key3: null,
    };
    const { results } = useTranslatedDescriptions([value], ['key2', 'key3', 'key1']);

    expect(results[0].descriptions).toEqual([
        {
            key: 'key2',
            value: undefined,
            term: 'fhir.key2',
            details: 'fhir.unknown',
        },
        {
            key: 'key3',
            value: null,
            term: 'fhir.key3',
            details: 'fhir.unknown',
        },
        {
            key: 'key1',
            value: 'value1',
            term: 'fhir.key1',
            details: 'value1',
        },
    ]);
});
