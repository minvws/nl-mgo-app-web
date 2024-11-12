import { faker } from '$test/faker';
import { type MgoResourceR3 } from '@minvws/mgo-fhir-data';
import { uniqueId } from 'lodash';
import { expect, test, vi } from 'vitest';
import { useResourcesStore } from './resources';

vi.mock('@minvws/mgo-fhir-data');

function mockResourceDto() {
    return {
        dataServiceId: faker.number.int({ max: 60 }),
        organizationId: uniqueId(faker.string.uuid()),
        mgoResource: {
            profile: uniqueId(faker.lorem.word()),
            referenceId: faker.lorem.word(),
        } as MgoResourceR3,
    };
}

test('addResources adds a resource', async () => {
    let state = useResourcesStore.getState();
    expect(state.resources).toEqual([]);

    const resourceDto = mockResourceDto();
    const [resource] = state.addResources([resourceDto]);
    const { organizationId, dataServiceId, mgoResource } = resourceDto;

    expect(resource.id).toEqual(`${organizationId}-${dataServiceId}-${mgoResource.referenceId}`);
    state = useResourcesStore.getState();
    expect(state.resources).toEqual([resource]);
});

test('addResources can add multiple resources and generates unique slugs', async () => {
    let state = useResourcesStore.getState();
    expect(state.resources).toEqual([]);

    state.addResources([mockResourceDto(), mockResourceDto(), mockResourceDto()]);
    state = useResourcesStore.getState();

    const newResourceDto = mockResourceDto();
    const newResourceDto2 = mockResourceDto();
    const newResourceDto3 = mockResourceDto();

    state.addResources([newResourceDto, newResourceDto2, newResourceDto3]);
    state = useResourcesStore.getState();
    const slugs = state.resources.map((resource) => resource.slug);

    expect(state.resources.length).toBe(6);
    expect(new Set(slugs).size).toBe(6);
});

test('addResources logs warning if there is already a resource with the same id', async () => {
    let state = useResourcesStore.getState();

    const resourceDto = mockResourceDto();
    const { organizationId, dataServiceId, mgoResource } = resourceDto;

    const mockWarningLog = vi.spyOn(console, 'warn');
    mockWarningLog.mockImplementationOnce(() => {});
    state.addResources([resourceDto, resourceDto]);
    state = useResourcesStore.getState();

    expect(mockWarningLog).toBeCalledWith(
        `Resource with id "${organizationId}-${dataServiceId}-${mgoResource.referenceId}" already exists`
    );
    expect(state.resources.length).toBe(1);
});

test('getResourcesByProfile returns resource', async () => {
    let state = useResourcesStore.getState();
    expect(state.resources).toEqual([]);

    const resourceDto = mockResourceDto();
    state.addResources([resourceDto, mockResourceDto(), mockResourceDto(), mockResourceDto()]);

    state = useResourcesStore.getState();
    expect(state.resources.length).toBe(4);
    const { organizationId, dataServiceId, mgoResource } = resourceDto;
    const matchedResources = state.getResourcesByProfile(resourceDto.mgoResource.profile);

    expect(matchedResources.length).toBe(1);
    expect(matchedResources[0].id).toEqual(
        `${organizationId}-${dataServiceId}-${mgoResource.referenceId}`
    );
});

test('getResourcesByProfile returns resource filtered by organization id', async () => {
    let state = useResourcesStore.getState();
    expect(state.resources).toEqual([]);

    const resourceDto1 = mockResourceDto();
    const resourceDto2 = mockResourceDto();
    const resourceDto3 = mockResourceDto();
    const resourceDto4 = mockResourceDto();

    resourceDto2.mgoResource.profile = resourceDto1.mgoResource.profile;
    resourceDto3.mgoResource.profile = resourceDto1.mgoResource.profile;
    resourceDto4.mgoResource.profile = resourceDto1.mgoResource.profile;

    resourceDto3.organizationId = resourceDto1.organizationId;

    state.addResources([resourceDto1, resourceDto2, resourceDto3, resourceDto4]);

    state = useResourcesStore.getState();
    expect(state.resources.length).toBe(4);
    const matchedResources = state.getResourcesByProfile(resourceDto1.mgoResource.profile, [
        resourceDto1.organizationId,
    ]);

    expect(matchedResources.length).toBe(2);
    expect(matchedResources[0].id).toEqual(
        `${resourceDto1.organizationId}-${resourceDto1.dataServiceId}-${resourceDto1.mgoResource.referenceId}`
    );
    expect(matchedResources[1].id).toEqual(
        `${resourceDto3.organizationId}-${resourceDto3.dataServiceId}-${resourceDto3.mgoResource.referenceId}`
    );
});

test('getResourceBySlug returns a resource by slug', async () => {
    let state = useResourcesStore.getState();

    const resourceDto = mockResourceDto();
    const [resource] = state.addResources([resourceDto]);
    const { organizationId, dataServiceId, mgoResource } = resourceDto;

    expect(resource.id).toEqual(`${organizationId}-${dataServiceId}-${mgoResource.referenceId}`);

    state = useResourcesStore.getState();
    expect(state.getResourceBySlug(resource.slug)).toBe(resource);
});

test('getResourceBySlug returns undefined if an empty slug is provided', async () => {
    let state = useResourcesStore.getState();
    state.addResources([mockResourceDto()]);
    state = useResourcesStore.getState();
    expect(state.getResourceBySlug('')).toBeUndefined();
});
