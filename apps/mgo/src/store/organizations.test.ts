import { faker } from '$test/faker';
import { expect, test } from 'vitest';
import { useOrganizationsStore } from './organizations';

test('addOrganization adds an organization', async () => {
    let state = useOrganizationsStore.getState();
    expect(state.organizations).toEqual([]);

    const organization = faker.custom.healthcareOrganization();
    const { slug } = state.addOrganization(organization);
    organization.slug = slug;

    state = useOrganizationsStore.getState();
    expect(state.organizations).toEqual([organization]);
});

test('getOrganizationBySlug returns organization', async () => {
    const { addOrganization, getOrganizationBySlug } = useOrganizationsStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());
    expect(getOrganizationBySlug(organization.slug)).toBe(organization);
});

test('getOrganizationBySlug returns undefined if there is no match', async () => {
    const { getOrganizationBySlug } = useOrganizationsStore.getState();
    expect(getOrganizationBySlug()).toBe(undefined);
});

test('removeOrganizationBySlug removes organization', async () => {
    let state = useOrganizationsStore.getState();
    const organization = state.addOrganization(faker.custom.healthcareOrganization());

    state = useOrganizationsStore.getState();
    expect(state.organizations.length).toBe(1);

    state.removeOrganizationBySlug(organization.slug);

    state = useOrganizationsStore.getState();
    expect(state.organizations.length).toBe(0);
});

test('hasOrganizations returns true when there are registered organizations', async () => {
    let state = useOrganizationsStore.getState();

    state = useOrganizationsStore.getState();
    expect(state.hasOrganizations()).toBe(false);

    state.addOrganization(faker.custom.healthcareOrganization());

    state = useOrganizationsStore.getState();
    expect(state.hasOrganizations()).toBe(true);
});

test('hasOrganizationById returns true when there are registered organizations with the same id', async () => {
    let state = useOrganizationsStore.getState();

    const organization = faker.custom.healthcareOrganization();

    state = useOrganizationsStore.getState();
    expect(state.hasOrganizationById(organization.id)).toBe(false);

    state.addOrganization(organization);

    state = useOrganizationsStore.getState();
    expect(state.hasOrganizationById(organization.id)).toBe(true);
});
