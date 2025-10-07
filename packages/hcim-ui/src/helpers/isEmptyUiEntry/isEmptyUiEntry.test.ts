import { faker } from '$test';
import { expect, test } from 'vitest';
import { type UiElement } from '../../types/index.js';
import { isEmptyUiEntry } from './isEmptyUiEntry.js';

test.each<Partial<UiElement>>([
    { type: 'REFERENCE_VALUE', reference: undefined },
    { type: 'SINGLE_VALUE', value: undefined },
    { type: 'SINGLE_VALUE', value: { display: undefined } },
    { type: 'MULTIPLE_VALUES', value: undefined },
    { type: 'MULTIPLE_VALUES', value: [] },
    { type: 'MULTIPLE_GROUPED_VALUES', value: undefined },
    { type: 'MULTIPLE_GROUPED_VALUES', value: [] },
    { type: 'MULTIPLE_GROUPED_VALUES', value: [[], []] },
    { type: 'DOWNLOAD_LINK', url: undefined },
])('returns true when the value is nullish: %j', (entry) => {
    expect(isEmptyUiEntry(entry as UiElement)).toBe(true);
});

test.each<Partial<UiElement>>([
    { type: 'REFERENCE_VALUE', display: faker.lorem.word() },
    { type: 'REFERENCE_VALUE', reference: faker.lorem.word() },
    { type: 'SINGLE_VALUE', value: { display: '' } },
    { type: 'SINGLE_VALUE', value: { display: faker.lorem.word() } },
    { type: 'MULTIPLE_VALUES', value: [{ display: faker.lorem.word() }] },
    { type: 'MULTIPLE_GROUPED_VALUES', value: [[{ display: faker.lorem.word() }]] },
    { type: 'DOWNLOAD_LINK', url: faker.lorem.word() },
])('returns false if it contains a value: %j', (entry) => {
    expect(isEmptyUiEntry(entry as UiElement)).toBe(false);
});

test('throws if the entry is not recognized', () => {
    expect(
        () =>
            isEmptyUiEntry({
                type: 'UKNOWN_TYPE',
            } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    ).toThrowError(`Unknown UI entry type: {"type":"UKNOWN_TYPE"}`);
});
