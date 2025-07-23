import { faker } from '$test/faker';
import { FhirVersion } from '@minvws/mgo-fhir';
import { defaults, uniqueId } from 'lodash';
import { type PartialDeep } from 'type-fest';
import { expect, test, vi } from 'vitest';
import { useResourcesStore, type ResourceDTO } from './resources';

function mockResourceDto<V extends FhirVersion>(
    fhirVersion?: V,
    resource: PartialDeep<ResourceDTO<V>> = {}
): ResourceDTO<V> {
    const version = fhirVersion ?? faker.helpers.arrayElement([FhirVersion.R3, FhirVersion.R4]);
    return {
        dataServiceId: faker.number.int({ max: 60 }),
        organizationId: uniqueId(faker.string.uuid()),
        mgoResource: defaults(resource.mgoResource, {
            id: faker.string.uuid(),
            fhirVersion: `${version}`,
            profile:
                version === FhirVersion.R3
                    ? 'http://fhir.nl/fhir/StructureDefinition/nl-core-patient' // NOSONAR
                    : 'http://nictiz.nl/fhir/StructureDefinition/nl-core-Patient', // NOSONAR
            referenceId: `${faker.lorem.word()}/${faker.number.int()}`,
            resourceType: faker.lorem.word(),
        }),
        ...resource,
    } as ResourceDTO<V>;
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

    state.addResources([mockResourceDto(), mockResourceDto(), mockResourceDto()]);
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

    const resourceDto = mockResourceDto(FhirVersion.R3, {
        mgoResource: { profile: 'http://nictiz.nl/fhir/StructureDefinition/gp-DiagnosticResult' }, // NOSONAR
    });
    const resourceDtos = [resourceDto, mockResourceDto(), mockResourceDto(), mockResourceDto()];
    state.addResources(resourceDtos);

    state = useResourcesStore.getState();

    const matchedResources = state.getResourcesByProfile(
        FhirVersion.R3,
        resourceDto.mgoResource.profile
    );

    expect(state.resources.length).toBe(resourceDtos.length);
    expect(matchedResources.length).toBe(1);
    expect(matchedResources[0].mgoResource.id).toEqual(resourceDto.mgoResource.id);
});

test('getResourcesByProfile returns resource filtered by organization id', async () => {
    let state = useResourcesStore.getState();
    expect(state.resources).toEqual([]);

    const resourceDto = mockResourceDto(FhirVersion.R3);
    const resourceDtos = [
        resourceDto,
        mockResourceDto(FhirVersion.R3),
        mockResourceDto(FhirVersion.R3),
        mockResourceDto(FhirVersion.R3),
    ];

    resourceDtos[1].mgoResource.profile = resourceDto.mgoResource.profile;
    resourceDtos[2].mgoResource.profile = resourceDto.mgoResource.profile;
    resourceDtos[3].mgoResource.profile = resourceDto.mgoResource.profile;

    resourceDtos[3].organizationId = resourceDto.organizationId;

    state.addResources(resourceDtos);

    state = useResourcesStore.getState();
    expect(state.resources.length).toBe(4);
    const matchedResources = state.getResourcesByProfile(
        FhirVersion.R3,
        resourceDto.mgoResource.profile,
        [resourceDto.organizationId]
    );

    expect(matchedResources.length).toBe(2);
    expect(matchedResources[0].mgoResource.id).toEqual(resourceDto.mgoResource.id);
    expect(matchedResources[1].mgoResource.id).toEqual(resourceDtos[3].mgoResource.id);
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

test('getResourceByReferenceId returns the resource by referenceID', async () => {
    let state = useResourcesStore.getState();
    const dataServiceId = faker.custom.dataServiceId();
    const organizationId = uniqueId(faker.string.uuid());

    const resourceDto = mockResourceDto(FhirVersion.R3, { organizationId, dataServiceId });
    const relatedResourceDto = mockResourceDto(FhirVersion.R3, { organizationId, dataServiceId });

    const [relatedResource, resource] = state.addResources([
        relatedResourceDto,
        resourceDto,
        mockResourceDto(),
        mockResourceDto(),
        mockResourceDto(),
    ]);
    state = useResourcesStore.getState();
    expect(
        state.getResourceByReferenceId(relatedResource, resourceDto.mgoResource.referenceId)
    ).toBe(resource);
});

test('getResourceByReferenceId returns undefined if no related resource is provided', async () => {
    let state = useResourcesStore.getState();
    const resourceDto = mockResourceDto();
    state.addResources([mockResourceDto(), resourceDto, mockResourceDto(), mockResourceDto()]);
    state = useResourcesStore.getState();
    expect(
        state.getResourceByReferenceId(undefined, resourceDto.mgoResource.referenceId)
    ).toBeUndefined();
});

test('getResourceByReferenceId returns undefined if no referenceID is provided', async () => {
    let state = useResourcesStore.getState();
    const relatedResourceDto = mockResourceDto();

    const [relatedResource] = state.addResources([
        relatedResourceDto,
        mockResourceDto(),
        mockResourceDto(),
        mockResourceDto(),
        mockResourceDto(),
    ]);
    state = useResourcesStore.getState();
    expect(state.getResourceByReferenceId(relatedResource, undefined)).toBeUndefined();
});
