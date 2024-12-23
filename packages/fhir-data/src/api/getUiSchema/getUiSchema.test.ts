import { faker, testUiSchemaContext } from '$test';
import { type Patient } from 'fhir/r4';
import { expect, test } from 'vitest';
import { Locale } from '../../i18n';
import { zibMedicationUse } from '../../r3/resources/zibMedicationUse/zibMedicationUse';
import { r4NlCorePatient } from '../../r4/resources/nlCorePatient/nlCorePatient';
import { getUiSchema } from './getUiSchema';
import { type MgoResourceR3 } from '../resources/resources';

test('returns the expected output for a R3 resource', () => {
    const mgoResource = zibMedicationUse.parse(
        faker.fhir.medicationStatement({
            meta: {
                profile: [zibMedicationUse.profile],
            },
        }),
        faker.custom.i18nContext()
    );
    const expectedResult = zibMedicationUse.uiSchema(
        mgoResource,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    const result = getUiSchema(mgoResource);
    expect(result).toEqual(expectedResult);
});

test('returns the expected output for a R4 resource', () => {
    const mgoResource = r4NlCorePatient.parse(
        {
            meta: {
                profile: [r4NlCorePatient.profile],
            },
            resourceType: 'Patient',
        } as Patient,
        faker.custom.i18nContext()
    );
    const expectedResult = r4NlCorePatient.uiSchema(
        mgoResource,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    const result = getUiSchema(mgoResource);
    expect(result).toEqual(expectedResult);
});

test('returns the expected output when locale is specified', () => {
    const mgoResource = zibMedicationUse.parse(
        faker.fhir.medicationStatement({
            meta: {
                profile: [zibMedicationUse.profile],
            },
        }),
        faker.custom.i18nContext()
    );
    const expectedResult = zibMedicationUse.uiSchema(
        mgoResource,
        testUiSchemaContext({
            ignoreMissingTranslations: true,
        })
    );
    const result = getUiSchema(mgoResource, { locale: Locale.NL_NL });
    expect(result).toEqual(expectedResult);
});

test('throws if no config could be found', () => {
    const medicationStatement = faker.fhir.medicationStatement({
        meta: { profile: [zibMedicationUse.profile] },
    });
    const mgoResource = zibMedicationUse.parse(medicationStatement, faker.custom.i18nContext());

    (mgoResource as any).profile = faker.lorem.word() as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    expect(() => {
        getUiSchema(mgoResource);
    }).toThrowError(`No config found for MGO Resource with profile: "${mgoResource.profile}"`);
});

test('throws if the input is a MGO resource', () => {
    expect(() => getUiSchema({} as MgoResourceR3)).toThrowError(
        `input does not seem to be a valid MGO Resource. Received MGO resource profile: "undefined"`
    );
});
