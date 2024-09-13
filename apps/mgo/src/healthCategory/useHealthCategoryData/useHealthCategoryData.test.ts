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
    HealthCategory.Allergies,
    HealthCategory.Complaints,
    HealthCategory.Documents,
    HealthCategory.LabResults,
    HealthCategory.Measurements,
    HealthCategory.Reports,
    HealthCategory.Treatments,
    HealthCategory.Vaccinations,
])('returns empty data for category %s', (category) => {
    const { result } = renderHook(() => useHealthCategoryData(category));

    expect(result.current).toEqual({});
});
