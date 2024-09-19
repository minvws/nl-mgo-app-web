import { renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HealthCategory } from '../HealthCategory';
import { useHealthCategoryData } from './useHealthCategoryData';

test('returns medication data', () => {
    const { result } = renderHook(() => useHealthCategoryData(HealthCategory.Medication));

    expect(result.current).toEqual({
        medicationUse: [],
    });
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
])('returns empty data for category %s', (category) => {
    const { result } = renderHook(() => useHealthCategoryData(category));

    expect(result.current).toEqual({});
});
