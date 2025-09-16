import { faker } from '$test/faker';
import { expect, test } from 'vitest';
import { store } from '..';

test('addOrganization adds an organization', async () => {
    let state = store.getState();
    expect(state.organizations).toEqual([]);

    const organization = faker.custom.healthcareOrganization();
    const { slug } = state.addOrganization(organization);
    organization.slug = slug;

    state = store.getState();
    expect(state.organizations).toEqual([organization]);
});

test('getOrganizationBySlug returns organization', async () => {
    const { addOrganization, getOrganizationBySlug } = store.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());
    expect(getOrganizationBySlug(organization.slug)).toBe(organization);
});

test('getOrganizationBySlug returns undefined if there is no match', async () => {
    const { getOrganizationBySlug } = store.getState();
    expect(getOrganizationBySlug()).toBe(undefined);
});

test('getOrganizationById returns organization', async () => {
    const { addOrganization, getOrganizationById } = store.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());
    expect(getOrganizationById(organization.id)).toBe(organization);
});

test('getOrganizationById returns undefined if there is no match', async () => {
    const { getOrganizationById } = store.getState();
    expect(getOrganizationById()).toBe(undefined);
});

test('getOrganizationsById returns organizations', async () => {
    const { addOrganization, getOrganizationsById } = store.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());
    expect(getOrganizationsById([organization.id])).toEqual([organization]);
});

test('getOrganizationsById returns an empty result if no ids are provided', async () => {
    const { addOrganization, getOrganizationsById } = store.getState();
    addOrganization(faker.custom.healthcareOrganization());
    expect(getOrganizationsById([])).toEqual([]);
});

test('removeOrganizationBySlug removes organization', async () => {
    let state = store.getState();
    const organization = state.addOrganization(faker.custom.healthcareOrganization());

    state = store.getState();
    expect(state.organizations.length).toBe(1);

    state.removeOrganizationBySlug(organization.slug);

    state = store.getState();
    expect(state.organizations.length).toBe(0);
});

test('hasOrganizations returns true when there are registered organizations', async () => {
    let state = store.getState();

    expect(state.hasOrganizations()).toBe(false);

    state.addOrganization(faker.custom.healthcareOrganization());

    state = store.getState();
    expect(state.hasOrganizations()).toBe(true);
});

test('hasOrganizationById returns true when there are registered organizations with the same id', async () => {
    let state = store.getState();

    const organization = faker.custom.healthcareOrganization();

    expect(state.hasOrganizationById(organization.id)).toBe(false);

    state.addOrganization(organization);

    state = store.getState();
    expect(state.hasOrganizationById(organization.id)).toBe(true);
});
