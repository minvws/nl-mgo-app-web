import { faker } from '$test';
import { expect, test, vi } from 'vitest';
import { getMgoResource } from './getMgoResource';
import { zibMedicationUse } from '../../resources/zibMedicationUse/zibMedicationUse';

test('returns the expected output', () => {
    const fhirResource = faker.fhir.medicationStatement({
        meta: {
            profile: [zibMedicationUse.profile],
        },
    });
    const expectedResult = zibMedicationUse.parse(fhirResource);
    const result = getMgoResource(fhirResource);
    expect(result).toEqual(expectedResult);
});

test.each([{ profile: [faker.lorem.word()] }, { profile: undefined }])(
    'logs error if no config could be found',
    (meta) => {
        const fhirResource = faker.fhir.medicationStatement({
            meta,
        });

        const mockErrorLog = vi.spyOn(console, 'error');
        mockErrorLog.mockImplementationOnce(() => {});
        const result = getMgoResource(fhirResource);

        expect(mockErrorLog).toBeCalledWith(
            `No config found for fhir resourceType: "${fhirResource.resourceType}" with profile: "${meta.profile}"`
        );
        expect(result).toBeUndefined();
    }
);
