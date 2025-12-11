import { faker } from '$test/faker';
import { expect, test } from 'vitest';
import { useStore } from '..';

test('addOrganization adds an organization', async () => {
    let state = useStore.getState();
    expect(state.organizations).toEqual([]);

    const organization = faker.custom.healthcareOrganization();
    const { slug } = state.addOrganization(organization);
    organization.slug = slug;

    state = useStore.getState();
    expect(state.organizations).toEqual([organization]);
});

test('getOrganizationBySlug returns organization', async () => {
    const { addOrganization, getOrganizationBySlug } = useStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());
    expect(getOrganizationBySlug(organization.slug)).toBe(organization);
});

test('getOrganizationBySlug returns undefined if there is no match', async () => {
    const { getOrganizationBySlug } = useStore.getState();
    expect(getOrganizationBySlug()).toBe(undefined);
});

test('getOrganizationById returns organization', async () => {
    const { addOrganization, getOrganizationById } = useStore.getState();
    const organization = addOrganization(faker.custom.healthcareOrganization());
    expect(getOrganizationById(organization.id)).toBe(organization);
});

test('getOrganizationById returns undefined if there is no match', async () => {
    const { getOrganizationById } = useStore.getState();
    expect(getOrganizationById()).toBe(undefined);
});

test('removeOrganizationBySlug removes organization and its resources', async () => {
    const organization = faker.custom.healthcareOrganization();
    const organizationResource = faker.custom.resource();
    organizationResource.source.organizationId = organization.id;

    const otherResource = faker.custom.resource();
    useStore.setState({
        organizations: [organization],
        resources: [organizationResource, otherResource],
    });

    let state = useStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(state.resources.length).toBe(2);

    state.removeOrganizationBySlug(organization.slug);

    state = useStore.getState();
    expect(state.organizations.length).toBe(0);
    expect(state.resources.length).toBe(1);
    expect(state.resources).not.toContain(organizationResource);
});

test('removeOrganizationBySlug does not do anything if there is no organization', async () => {
    useStore.setState({
        organizations: [faker.custom.healthcareOrganization()],
        resources: [faker.custom.resource()],
    });

    const state = useStore.getState();
    state.removeOrganizationBySlug('non-existent');

    const newState = useStore.getState();
    expect(newState).toBe(state);
});

test('hasOrganizations returns true when there are registered organizations', async () => {
    let state = useStore.getState();

    expect(state.hasOrganizations()).toBe(false);

    state.addOrganization(faker.custom.healthcareOrganization());

    state = useStore.getState();
    expect(state.hasOrganizations()).toBe(true);
});

test('hasOrganizationById returns true when there are registered organizations with the same id', async () => {
    let state = useStore.getState();

    const organization = faker.custom.healthcareOrganization();

    expect(state.hasOrganizationById(organization.id)).toBe(false);

    state.addOrganization(organization);

    state = useStore.getState();
    expect(state.hasOrganizationById(organization.id)).toBe(true);
});

test('getOrganizationResourceEndpoint returns the resource endpoint for organization and data service', async () => {
    const organization = faker.custom.healthcareOrganization();
    const { id: organizationId, dataServices } = organization;
    const { id: dataServiceId, resourceEndpoint } = dataServices[0];

    useStore.setState({ organizations: [organization], resources: [] });

    const { getOrganizationResourceEndpoint } = useStore.getState();
    expect(getOrganizationResourceEndpoint(organizationId, dataServiceId)).toBe(resourceEndpoint);
});

test('getOrganizationResourceEndpoint returns undefined when there is no match', async () => {
    useStore.setState({ organizations: [], resources: [] });

    const { getOrganizationResourceEndpoint } = useStore.getState();
    expect(getOrganizationResourceEndpoint('unknown-org', 'unknown-service')).toBeUndefined();
});
