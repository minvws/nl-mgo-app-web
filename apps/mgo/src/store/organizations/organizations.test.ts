import { faker } from '$test/faker';
import { expect, test } from 'vitest';
import { useStore } from '..';

test('addOrganization adds an organization', async () => {
    let state = useStore.getState();
    expect(state.organizations).toEqual([]);

    const organizationSearchResult = faker.custom.organizationSearchResult();
    state.addOrganization(organizationSearchResult);

    state = useStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(state.organizations[0].id).toBe(organizationSearchResult.id);
});

test('getOrganizationBySlug returns organization', async () => {
    const { addOrganization, getOrganizationBySlug } = useStore.getState();
    const organization = addOrganization(faker.custom.organizationSearchResult());
    expect(getOrganizationBySlug(organization.slug)).toBe(organization);
});

test('getOrganizationBySlug returns undefined if there is no match', async () => {
    const { getOrganizationBySlug } = useStore.getState();
    expect(getOrganizationBySlug()).toBe(undefined);
});

test('getOrganizationById returns organization', async () => {
    const { addOrganization, getOrganizationById } = useStore.getState();
    const organization = addOrganization(faker.custom.organizationSearchResult());
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

test(`removeOrganizationBySlug removes organization but doesn't change the resources if there is nothing to remove`, async () => {
    const organization = faker.custom.healthcareOrganization();
    const otherResource = faker.custom.resource();
    useStore.setState({
        organizations: [organization],
        resources: [otherResource],
    });

    let state = useStore.getState();
    expect(state.organizations.length).toBe(1);
    expect(state.resources.length).toBe(1);

    state.removeOrganizationBySlug(organization.slug);

    state = useStore.getState();
    expect(state.organizations.length).toBe(0);
    expect(state.resources.length).toBe(1);
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

    state.addOrganization(faker.custom.organizationSearchResult());

    state = useStore.getState();
    expect(state.hasOrganizations()).toBe(true);
});

test('hasOrganizationById returns true when there are registered organizations with the same id', async () => {
    let state = useStore.getState();

    const organization = faker.custom.organizationSearchResult();

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

test('addOrganization creates unique slugs when a new organization is added', async () => {
    const existing = faker.custom.healthcareOrganization();
    existing.slug = 'aanbieder';

    useStore.setState({ organizations: [existing], resources: [] });

    const { addOrganization } = useStore.getState();
    const created = addOrganization(faker.custom.organizationSearchResult());

    const state = useStore.getState();
    expect(state.organizations.length).toBe(2);
    expect(created.slug).not.toBe(existing.slug);
});
