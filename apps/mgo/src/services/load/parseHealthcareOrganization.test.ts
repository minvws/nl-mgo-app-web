import { faker } from '$test/faker';
import { log } from '@minvws/mgo-mgo-utils';
import { expect, type MockedFunction, test, vi } from 'vitest';
import {
    parseHealthcareOrganization,
    supportedDataServiceIds,
} from './parseHealthcareOrganization';
import { type HealthcareOrganizationDTO, type HealthcareServiceDTO } from './types';

vi.mock('@minvws/mgo-mgo-utils', async (importOriginal) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const mod = await importOriginal<typeof import('@minvws/mgo-mgo-utils')>();
    return {
        ...mod,
        log: {
            warn: vi.fn(),
            error: vi.fn(),
        },
    };
});

function mockHealthcareServiceDTO(): HealthcareServiceDTO {
    return {
        id: faker.string.uuid(),
        name: faker.string.sample(),
        interface_version: faker.number.int(),
        auth_endpoint: faker.internet.url(),
        token_endpoint: faker.internet.url(),
        roles: [
            {
                resource_endpoint: faker.internet.url(),
            },
        ],
    };
}

function mockHealthcareOrganizationDTO(): HealthcareOrganizationDTO {
    const streetAddress = `${faker.location.streetAddress()} ${faker.location.buildingNumber()}`;
    const postalcode = faker.location.zipCode('#### ??');
    const city = faker.location.city();

    return {
        display_name: faker.company.name(),
        active: faker.datatype.boolean(),
        identification: faker.string.sample(),
        addresses: [{ address: `${streetAddress}\r\n${postalcode} ${city}` }],
        names: [],
        data_services: [mockHealthcareServiceDTO()],
        types: [
            {
                code: faker.lorem.word(),
                display_name: faker.lorem.sentence(),
                type: faker.internet.url(),
            },
        ],
    };
}

test('parses healthcare organization details', () => {
    const healthcareOrganizationDto = mockHealthcareOrganizationDTO();
    const result = parseHealthcareOrganization(healthcareOrganizationDto);

    expect(result.id).toEqual(healthcareOrganizationDto.identification);
    expect(result.name).toEqual(healthcareOrganizationDto.display_name);
    expect(result.category).toEqual(healthcareOrganizationDto.types![0].display_name);
    expect(result.address).toEqual(healthcareOrganizationDto.addresses![0].address);
});

test('can handle undefined values', () => {
    const healthcareOrganizationDto = mockHealthcareOrganizationDTO();
    healthcareOrganizationDto.display_name = undefined;
    healthcareOrganizationDto.types = undefined;
    healthcareOrganizationDto.addresses = undefined;
    const result = parseHealthcareOrganization(healthcareOrganizationDto);

    expect(result.id).toEqual(healthcareOrganizationDto.identification);
    expect(result.name).toBe(undefined);
    expect(result.category).toBe(undefined);
    expect(result.address).toBe(undefined);
});

test('only returns supported data services', () => {
    const healthcareOrganizationDto = mockHealthcareOrganizationDTO();
    const supportedDataService = {
        ...mockHealthcareServiceDTO(),
        id: faker.helpers.arrayElement(supportedDataServiceIds),
    };

    healthcareOrganizationDto.data_services = [
        mockHealthcareServiceDTO(),
        mockHealthcareServiceDTO(),
        supportedDataService,
        mockHealthcareServiceDTO(),
    ];
    const result = parseHealthcareOrganization(healthcareOrganizationDto);

    expect(result.dataServices).toEqual([
        {
            id: supportedDataService.id,
            resourceEndpoint: supportedDataService.roles![0].resource_endpoint,
        },
    ]);
});

test('uses the first resource endpoint for a data service it finds', () => {
    const healthcareOrganizationDto = mockHealthcareOrganizationDTO();
    const supportedDataService = {
        ...mockHealthcareServiceDTO(),
        id: faker.helpers.arrayElement(supportedDataServiceIds),
        roles: [
            {
                resource_endpoint: faker.internet.url(),
            },
            {
                resource_endpoint: faker.internet.url(),
            },
            {
                resource_endpoint: faker.internet.url(),
            },
        ],
    };
    healthcareOrganizationDto.data_services = [supportedDataService];
    const result = parseHealthcareOrganization(healthcareOrganizationDto);
    expect(result.dataServices).toEqual([
        {
            id: supportedDataService.id,
            resourceEndpoint: supportedDataService.roles[0].resource_endpoint,
        },
    ]);
});

test('logs a warning if the resource endpoint does not exist', () => {
    const healthcareOrganizationDto = mockHealthcareOrganizationDTO();
    const supportedDataService = {
        ...mockHealthcareServiceDTO(),
        id: faker.helpers.arrayElement(supportedDataServiceIds),
        roles: [
            {
                resource_endpoint: undefined,
            },
        ],
    };
    healthcareOrganizationDto.data_services = [supportedDataService];
    const { identification, display_name } = healthcareOrganizationDto;

    const mockLogWarn = log.warn as MockedFunction<typeof log.warn>;
    const result = parseHealthcareOrganization(healthcareOrganizationDto);

    expect(mockLogWarn).toHaveBeenCalledWith(
        `Data service for organization: ${display_name} (${identification}) with id "${supportedDataService.id}" does not contain a resource endpoint`
    );
    expect(result.dataServices).toEqual([]);
});
