import { faker } from '$test';
import { expect, test } from 'vitest';
import { getUiSchema } from './getUiSchema';
import { zibMedicationUse } from '../../resources/zibMedicationUse/zibMedicationUse';

test('returns the expected output', () => {
    const mgoResource = zibMedicationUse.parse(
        faker.fhir.medicationStatement({
            meta: {
                profile: [zibMedicationUse.profile],
            },
        })
    );
    const expectedResult = zibMedicationUse.uiSchema(mgoResource);
    const result = getUiSchema(mgoResource);
    expect(result).toEqual(expectedResult);
});

test('throws if no config could be found', () => {
    const mgoResource = zibMedicationUse.parse(
        faker.fhir.medicationStatement({ meta: { profile: [zibMedicationUse.profile] } })
    );

    (mgoResource as any).profile = faker.lorem.word() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(() => {
        getUiSchema(mgoResource);
    }).toThrowError(`No config found for MGO Resource with profile: "${mgoResource.profile}"`);
});
