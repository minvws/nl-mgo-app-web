import { healthcareOrganizationDTO } from '$test/data';
import { faker } from '@faker-js/faker';
import { kebabCase } from 'lodash';
import { expect, test } from 'vitest';
import { useHealthcareOrganizationsStore } from './healthcareProviders';

test('healthcareProviders returns undefined if slug does not match', async () => {
    const organizationName = faker.company.name();
    const expectedSlug = kebabCase(organizationName);

    const { addHealthcareOrganization, getHealthcareOrganization } =
        useHealthcareOrganizationsStore.getState();

    const organization = healthcareOrganizationDTO({ display_name: organizationName });

    addHealthcareOrganization(organization);
    expect(getHealthcareOrganization(expectedSlug)).toMatchObject(organization);
});

test('healthcareProviders returns undefined if slug does not match', async () => {
    const { getHealthcareOrganization } = useHealthcareOrganizationsStore.getState();
    expect(getHealthcareOrganization()).toBe(undefined);
});

test('removeHealthcareProvider removes item by slug', async () => {
    const { addHealthcareOrganization } = useHealthcareOrganizationsStore.getState();
    addHealthcareOrganization(healthcareOrganizationDTO());

    let state = useHealthcareOrganizationsStore.getState();
    state.removeHealthcareOrganization(state.healthcareOrganizations[0].slug);

    state = useHealthcareOrganizationsStore.getState();
    expect(state.healthcareOrganizations.length).toBe(0);
});
