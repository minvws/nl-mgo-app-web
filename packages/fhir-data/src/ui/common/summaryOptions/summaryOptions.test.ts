import { faker } from '$test';
import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { expect, test } from 'vitest';
import { type MgoResource } from '../../../api/resources/resources';
import { summaryOptions } from './summaryOptions';

test('creates a options group for the summary ui schema', () => {
    const uiHelperContext = faker.custom.uiHelperContext();
    const resource = {
        referenceId: 'MedicationStatement/zib-medicationuse-01',
    } as unknown as MgoResource<FhirVersion.R3>;
    const summaryOptionsGroup = summaryOptions(uiHelperContext, 'r3.zib_medication_use', resource);

    expect(summaryOptionsGroup).toMatchSnapshot();
});
