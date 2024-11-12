import { faker } from '$test';
import { expect, test } from 'vitest';
import { getUiSchema } from './getUiSchema';
import { zibMedicationUse } from '../../r3/resources/zibMedicationUse/zibMedicationUse';
import { nlCorePatientR4 } from '../../r4/resources/nlCorePatient/nlCorePatient';
import { type Patient } from 'fhir/r4';

test('returns the expected output for a R3 resource', () => {
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

test('returns the expected output for a R4 resource', () => {
    const mgoResource = nlCorePatientR4.parse({
        meta: {
            profile: [nlCorePatientR4.profile],
        },
    } as Patient);
    const expectedResult = nlCorePatientR4.uiSchema(mgoResource);
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
