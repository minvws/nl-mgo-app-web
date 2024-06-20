import { expect, test } from 'vitest';
import { times } from 'lodash';
import { assignId } from './assignId';

test('asigns an id', () => {
    const value = { foo: 'bar' };
    const withId = assignId(value);
    expect(withId.id).toBeTruthy();
});

test("asigns unique id's", () => {
    const values = times(20, () => ({ foo: 'bar' }));
    const assignedIds = values.map(assignId).map((x) => x.id);
    const uniqueIds = new Set(assignedIds);
    expect(values.length).toEqual(uniqueIds.size);
});
