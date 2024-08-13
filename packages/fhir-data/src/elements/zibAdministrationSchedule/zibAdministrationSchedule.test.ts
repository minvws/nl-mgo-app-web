import { faker, testSet } from '$test';
import { expect, test } from 'vitest';
import { replaceUndefined } from '../../ui/helpers/replaceUndefined/replaceUndefined';
import { zibAdministrationSchedule } from './zibAdministrationSchedule';

testSet(
    'zibAdministrationSchedule parses successfully',
    faker.fhir.timing,
    (data) => {
        const schema = zibAdministrationSchedule(data);
        expect(schema).toEqual(
            expect.objectContaining({
                duration: replaceUndefined(data.repeat?.duration),
            })
        );
    },
    false
);

test('zibAdministrationSchedule parses successfully when repeast is undefined', () => {
    const data = faker.fhir.timing();
    data.repeat = undefined;
    const schema = zibAdministrationSchedule(data);
    expect(schema).toEqual(
        expect.objectContaining({
            duration: null,
        })
    );
});
