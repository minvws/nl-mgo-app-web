import { expect, test } from 'vitest';
import { isEmptyUiEntry } from './isEmptyUiEntry';
import { type UiEntry } from '../../types';
import { faker } from '$test';

test.each<Partial<UiEntry>>([
    { type: 'REFERENCE_VALUE', reference: undefined },
    { type: 'SINGLE_VALUE', display: undefined },
    { type: 'MULTIPLE_VALUES', display: undefined },
    { type: 'MULTIPLE_VALUES', display: [] },
    { type: 'MULTIPLE_GROUPED_VALUES', display: undefined },
    { type: 'MULTIPLE_GROUPED_VALUES', display: [] },
    { type: 'MULTIPLE_GROUPED_VALUES', display: [[], []] },
    { type: 'DOWNLOAD_LINK', url: undefined },
])('returns true when the value is nullish: %j', (entry) => {
    expect(isEmptyUiEntry(entry as UiEntry)).toBe(true);
});

test.each<Partial<UiEntry>>([
    { type: 'REFERENCE_VALUE', reference: faker.lorem.word() },
    { type: 'SINGLE_VALUE', display: '' },
    { type: 'SINGLE_VALUE', display: faker.lorem.word() },
    { type: 'MULTIPLE_VALUES', display: [faker.lorem.word()] },
    { type: 'MULTIPLE_GROUPED_VALUES', display: [[faker.lorem.word()]] },
    { type: 'DOWNLOAD_LINK', url: faker.lorem.word() },
])('returns false if it contains a value: %j', (entry) => {
    expect(isEmptyUiEntry(entry as UiEntry)).toBe(false);
});

test('throws if the entry is not recognized', () => {
    expect(
        () =>
            isEmptyUiEntry({
                type: 'UKNOWN_TYPE',
            } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    ).toThrowError(`Unknown UI entry type: UKNOWN_TYPE`);
});
