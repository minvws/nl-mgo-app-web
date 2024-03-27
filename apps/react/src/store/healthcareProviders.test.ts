import { expect, test } from 'vitest';
import { useHealthcareProvidersStore } from './healthcareProviders';
import { faker } from '@faker-js/faker';
import { kebabCase } from 'lodash';

test('healthcareProviders returns undefined if slug does not match', async () => {
    const organisationName = faker.company.name();
    const expectedSlug = kebabCase(organisationName);

    const { addHealthcareProvider, getHealthcareProvider } = useHealthcareProvidersStore.getState();

    const organisation = {
        display_name: organisationName,
        id_type: faker.string.sample(),
        id_value: faker.string.sample(),
        addresses: [],
    };
    const service = {
        medmij_id: faker.string.sample(),
        organisation_type: faker.string.sample(),
        id_type: faker.string.sample(),
        id_value: faker.string.sample(),
        dataservices: [],
    };

    addHealthcareProvider({
        organisation,
        service,
    });

    expect(getHealthcareProvider(expectedSlug)!.organisation).toMatchObject(organisation);
    expect(getHealthcareProvider(expectedSlug)!.service).toMatchObject(service);
});

test('healthcareProviders returns undefined if slug does not match', async () => {
    const { getHealthcareProvider } = useHealthcareProvidersStore.getState();
    expect(getHealthcareProvider()).toBe(undefined);
});
