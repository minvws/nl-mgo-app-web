import { faker } from '$test/faker';
import { expect, test } from 'vitest';
import { useStore } from '..';
import { Resource, ResourceSource } from './resources';

function mockSource(): ResourceSource {
    return {
        organizationId: faker.string.uuid(),
        dataServiceId: faker.number.int().toString(),
        endpointId: faker.lorem.word(),
    };
}

test('syncResources can delete, update and add new resources', async () => {
    let state = useStore.getState();
    expect(state.resources).toEqual([]);
    const source = mockSource();
    const toBeDeletedResource = faker.custom.mgoResource();
    const toBeUpdatedResource = faker.custom.mgoResource();

    state.syncResources(source, [toBeDeletedResource, toBeUpdatedResource]);
    state = useStore.getState();

    expect(state.resources.length).toBe(2);

    const newResource = faker.custom.mgoResource();
    const updatedResource = {
        ...toBeUpdatedResource,
        resourceType: faker.lorem.word(),
    };
    state.syncResources(source, [newResource, updatedResource]);
    state = useStore.getState();
    expect(state.resources.length).toBe(2);

    const resourceIds = state.resources.map((resource: Resource) => resource.mgoResource.id);
    expect(resourceIds).not.toContain(toBeDeletedResource.id);
    expect(resourceIds).toContain(updatedResource.id);
    expect(resourceIds).toContain(updatedResource.id);

    expect(state.resources[1].mgoResource.resourceType).toBe(updatedResource.resourceType);
});

test('syncResources does not update the resources if nothing has changed', async () => {
    let state = useStore.getState();
    const source = mockSource();
    const resource1 = faker.custom.mgoResource();
    const resource2 = faker.custom.mgoResource();

    state.syncResources(source, [resource1, resource2]);
    state = useStore.getState();

    const resourcesBeforeNewSync = state.resources;
    expect(resourcesBeforeNewSync.length).toBe(2);

    state.syncResources(source, [{ ...resource2 }, { ...resource1 }]);
    state = useStore.getState();

    expect(state.resources).toBe(resourcesBeforeNewSync);
});

test('syncResources does not touch resources from other sources', async () => {
    let state = useStore.getState();
    const otherSource = mockSource();
    const otherResource1 = faker.custom.mgoResource();
    const otherResource2 = faker.custom.mgoResource();

    state.syncResources(otherSource, [otherResource1, otherResource2]);
    state = useStore.getState();
    expect(state.resources.length).toBe(2);

    const source = mockSource();
    const resource1 = faker.custom.mgoResource();
    const resource2 = faker.custom.mgoResource();

    state.syncResources(source, [resource1, resource2]);
    state = useStore.getState();
    expect(state.resources.length).toBe(4);

    state.syncResources(source, [resource2]);
    state = useStore.getState();

    expect(state.resources.length).toBe(3);

    const resourceIds = state.resources.map((resource: Resource) => resource.mgoResource.id);
    expect(resourceIds).toContain(otherResource1.id);
    expect(resourceIds).toContain(otherResource2.id);
    expect(resourceIds).not.toContain(resource1.id);
    expect(resourceIds).toContain(resource2.id);
});

test('getResourceBySlug returns a resource by slug', async () => {
    const resource = faker.custom.resource();
    useStore.setState({ resources: [resource] });

    const state = useStore.getState();
    expect(state.getResourceBySlug(resource.slug)).toBe(resource);
});

test('getResourceBySlug returns undefined if an empty slug is provided', async () => {
    const resource = faker.custom.resource();
    useStore.setState({ resources: [resource] });

    const state = useStore.getState();
    expect(state.getResourceBySlug(undefined)).toBe(undefined);
});

test('getResourceByReferenceId returns the resource by referenceID', async () => {
    const resource1 = faker.custom.resource();
    const resource2 = faker.custom.resource();
    resource2.source.dataServiceId = resource1.source.dataServiceId;
    resource2.source.organizationId = resource1.source.organizationId;

    useStore.setState({ resources: [resource1, resource2] });
    const { getResourceByReferenceId } = useStore.getState();

    expect(getResourceByReferenceId(resource1, resource2.mgoResource.referenceId)).toBe(resource2);
});

test('getResourceByReferenceId returns undefined if no related resource is provided', async () => {
    const resource1 = faker.custom.resource();
    const resource2 = faker.custom.resource();
    resource2.source.dataServiceId = resource1.source.dataServiceId;
    resource2.source.organizationId = resource1.source.organizationId;

    useStore.setState({ resources: [resource1, resource2] });
    const { getResourceByReferenceId } = useStore.getState();

    expect(getResourceByReferenceId(undefined, resource2.mgoResource.referenceId)).toBe(undefined);
});

test('getResourceByReferenceId returns undefined if no referenceID is provided', async () => {
    const resource1 = faker.custom.resource();
    const resource2 = faker.custom.resource();
    resource2.source.dataServiceId = resource1.source.dataServiceId;
    resource2.source.organizationId = resource1.source.organizationId;

    useStore.setState({ resources: [resource1, resource2] });
    const { getResourceByReferenceId } = useStore.getState();

    expect(getResourceByReferenceId(resource1, undefined)).toBe(undefined);
});

test('getResourcesByProfiles returns the resources by profiles and organizations', async () => {
    const resource1 = faker.custom.resource();
    const resource2 = faker.custom.resource();
    const resource3 = faker.custom.resource();
    const resource4 = faker.custom.resource();

    const organization1 = faker.custom.healthcareOrganization();
    const organization2 = faker.custom.healthcareOrganization();

    resource1.source.organizationId =
        resource2.source.organizationId =
        resource3.source.organizationId =
            organization1.id;
    resource4.source.organizationId = organization2.id;

    // @ts-expect-error - Testing with string profile
    resource1.mgoResource.profile = 'foobar';
    // @ts-expect-error - Testing with string profile
    resource2.mgoResource.profile = 'foobar';
    // @ts-expect-error - Testing with string profile
    resource3.mgoResource.profile = 'different';
    // @ts-expect-error - Testing with string profile
    resource4.mgoResource.profile = 'foobar';

    useStore.setState({ resources: [resource1, resource2, resource3, resource4] });
    const { getResourcesByProfiles } = useStore.getState();

    const resourcesFound = getResourcesByProfiles(['foobar'], [organization1]);

    expect(resourcesFound.length).toBe(2);
    expect(resourcesFound).toContain(resource1);
    expect(resourcesFound).toContain(resource2);
    expect(resourcesFound).not.toContain(resource3);
    expect(resourcesFound).not.toContain(resource4);
});
