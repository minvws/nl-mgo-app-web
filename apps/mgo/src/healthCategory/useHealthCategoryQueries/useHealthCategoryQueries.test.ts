import { useOrganizationsStore, type HealthcareOrganization } from '$/store';
import { faker } from '$test/faker';
import { DataServiceId } from '@minvws/mgo-data-services';
import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HealthCategory } from '../HealthCategory';
import { useHealthCategoryQueries } from './useHealthCategoryQueries';

vi.mock('$/services', () => ({
    getDataService: vi.fn(
        (_organization: HealthcareOrganization, dataServiceId: DataServiceId) => ({
            dataServiceId,
        })
    ),
}));

test('returns queries for specific organisations if specified', () => {
    const category = HealthCategory.Medication;
    const organizations = [faker.custom.healthcareOrganization()];
    const store = useOrganizationsStore.getState();
    vi.spyOn(store, 'getOrganizationsById').mockImplementation(() => organizations);

    const { result } = renderHook(() => useHealthCategoryQueries(category, [organizations[0].id]));
    const queryKeys = result.current.map((x) => x.queryKey);

    expect(queryKeys[0]).toEqual([
        category,
        organizations[0].id,
        DataServiceId.CommonClinicalDataset,
        'getMedicationUse',
    ]);
});

test('returns empty array for undefined organisation', () => {
    const organizations = [faker.custom.healthcareOrganization()];
    const store = useOrganizationsStore.getState();
    vi.spyOn(store, 'getOrganizationsById').mockImplementation(() => organizations);

    const { result } = renderHook(() => useHealthCategoryQueries(undefined, [organizations[0].id]));

    expect(result.current).toEqual([]);
});

test.each([
    HealthCategory.PersonalInformation,
    HealthCategory.PayerAndOrganization,
    HealthCategory.TreatmentPlan,
    HealthCategory.FunctionalOrMentalStatus,
    HealthCategory.Problems,
    HealthCategory.Lifestyle,
    HealthCategory.Warning,
    HealthCategory.AllergiesAndIntolerances,
    HealthCategory.MedicalDevices,
    HealthCategory.Vaccinations,
    HealthCategory.LaboratoryResults,
    HealthCategory.Procedures,
    HealthCategory.ContactsAndAppointments,
    HealthCategory.Vitals,
])('returns a queries collection for: %s', (category) => {
    const organizations = [faker.custom.healthcareOrganization()];
    const store = useOrganizationsStore.getState();
    vi.spyOn(store, 'getAllOrganizations').mockImplementation(() => organizations);

    const { result } = renderHook(() => useHealthCategoryQueries(category));

    expect(Array.isArray(result.current)).toBe(true);
});
