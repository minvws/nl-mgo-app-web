import { Resource, useStore } from '$/store';
import { faker } from '$test/faker';
import { getDetails, getSummary, HealthUiSchema } from '@minvws/mgo-hcim';
import { Locale } from '@minvws/mgo-intl';
import { renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { useHealthUiSchema } from './useHealthUiSchema';

vi.mock('@minvws/mgo-hcim', () => ({
    getSummary: vi.fn(),
    getDetails: vi.fn(),
}));

test('returns the summary of the resource', () => {
    const organization = faker.custom.healthcareOrganization();
    const resource = {
        source: { organizationId: organization.id },
    } as Resource;
    const summary = {} as HealthUiSchema;

    vi.mocked(getSummary).mockReturnValue(summary);
    const state = useStore.getState();
    vi.spyOn(state, 'getOrganizationById').mockReturnValue(organization);

    const { result } = renderHook(() => useHealthUiSchema());
    const schema = result.current.getSummary(resource);

    expect(getSummary).toHaveBeenCalledWith(resource.mgoResource, {
        organization,
        locale: Locale.NL_NL,
    });
    expect(schema).toBe(summary);
});

test('returns the details of the resource', () => {
    const organization = faker.custom.healthcareOrganization();
    const resource = {
        source: { organizationId: organization.id },
    } as Resource;
    const details = {} as HealthUiSchema;

    vi.mocked(getDetails).mockReturnValue(details);
    const state = useStore.getState();
    vi.spyOn(state, 'getOrganizationById').mockReturnValue(organization);

    const { result } = renderHook(() => useHealthUiSchema());
    const schema = result.current.getDetails(resource);

    expect(getDetails).toHaveBeenCalledWith(resource.mgoResource, {
        organization,
        locale: Locale.NL_NL,
    });
    expect(schema).toBe(details);
});

test('returns undefined when there is no resource', () => {
    const { result } = renderHook(() => useHealthUiSchema());
    const schema = result.current.getDetails(undefined);

    expect(schema).toBe(undefined);
});
