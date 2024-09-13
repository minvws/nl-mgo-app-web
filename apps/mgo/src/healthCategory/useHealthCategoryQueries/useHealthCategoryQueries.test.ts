import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HealthCategory } from '../HealthCategory';
import { useHealthCategoryQueries } from './useHealthCategoryQueries';
import { useOrganizationsStore } from '$/store';
import { faker } from '$test/faker';
import { DataServiceId } from '@minvws/mgo-fhir-client';

vi.mock('$/services', () => ({
    getCommonClinicalDatasetService: vi.fn(() => ({
        dataServiceId: DataServiceId.CommonClinicalDataset,
    })),
}));

test('returns queries for medication', () => {
    const organizations = [
        faker.custom.healthcareOrganization(),
        faker.custom.healthcareOrganization(),
    ];
    const store = useOrganizationsStore.getState();
    vi.spyOn(store, 'getAllOrganizations').mockImplementation(() => organizations);

    const { result } = renderHook(() => useHealthCategoryQueries(HealthCategory.Medication));
    const queryKeys = result.current.map((x) => x.queryKey);

    expect(queryKeys).toEqual([
        [
            organizations[0].id,
            DataServiceId.CommonClinicalDataset,
            HealthCategory.Medication,
            'getMedicationUse',
        ],
        [
            organizations[1].id,
            DataServiceId.CommonClinicalDataset,
            HealthCategory.Medication,
            'getMedicationUse',
        ],
    ]);
});

test('returns queries for specific organisations if specified', () => {
    const organizations = [faker.custom.healthcareOrganization()];
    const store = useOrganizationsStore.getState();
    vi.spyOn(store, 'getOrganizationsById').mockImplementation(() => organizations);

    const { result } = renderHook(() =>
        useHealthCategoryQueries(HealthCategory.Medication, [organizations[0].id])
    );
    const queryKeys = result.current.map((x) => x.queryKey);

    expect(queryKeys).toEqual([
        [
            organizations[0].id,
            DataServiceId.CommonClinicalDataset,
            HealthCategory.Medication,
            'getMedicationUse',
        ],
    ]);
});

test.each([
    HealthCategory.Allergies,
    HealthCategory.Complaints,
    HealthCategory.Documents,
    HealthCategory.LabResults,
    HealthCategory.Measurements,
    HealthCategory.Reports,
    HealthCategory.Treatments,
    HealthCategory.Vaccinations,
])('returns NO queries for categories that have not yet been implemented: %s', (category) => {
    const organizations = [faker.custom.healthcareOrganization()];
    const store = useOrganizationsStore.getState();
    vi.spyOn(store, 'getAllOrganizations').mockImplementation(() => organizations);

    const { result } = renderHook(() => useHealthCategoryQueries(category));
    const queryKeys = result.current.map((x) => x.queryKey);

    expect(queryKeys).toEqual([]);
});
