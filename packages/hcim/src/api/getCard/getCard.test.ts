import { faker } from '$test';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { type HcimCardDetails, type ResourceConfig } from '../../resourceTypes.js';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig.js';
import { type MgoResource } from '../resources/resources.js';
import { SchemaOptions } from '../schemaContext/schemaContext.js';
import { getCard } from './getCard.js';

const mockGetResourceConfig = getResourceConfig as MockedFunction<typeof getResourceConfig>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyResourceConfig = ResourceConfig<any, any, any>;

vi.mock('../getResourceConfig/getResourceConfig', () => ({
    getResourceConfig: vi.fn(),
}));

test('throws if the input is a MGO resource', () => {
    expect(() => getCard({} as MgoResource<'R3'>)).toThrowError(
        `input does not seem to be a valid MGO Resource. Received MGO resource profile: "undefined"`
    );
});

test('throws if no config could be found', () => {
    mockGetResourceConfig.mockImplementation(() => undefined);
    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    expect(() => {
        getCard(mgoResource as MgoResource<'R3'>);
    }).toThrowError(`No config found for MGO Resource with profile: "${mgoResource.profile}"`);
});

test('return defaults if card is not set', () => {
    mockGetResourceConfig.mockImplementation(() => ({}) as AnyResourceConfig);
    const mgoResource = {
        id: faker.lorem.word(),
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };
    const options = { organization: { name: faker.lorem.word() } } as SchemaOptions<'R3'>;

    expect(getCard(mgoResource as MgoResource<'R3'>, options)).toEqual({
        title: mgoResource.id,
        description: options.organization?.name,
    });
});

test('uses empty string as title when resource id is not set', () => {
    mockGetResourceConfig.mockImplementation(() => ({}) as AnyResourceConfig);
    const mgoResource = {
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };
    const options = { organization: { name: faker.lorem.word() } } as SchemaOptions<'R3'>;

    expect(getCard(mgoResource as MgoResource<'R3'>, options)).toEqual({
        title: '',
        description: options.organization?.name,
    });
});

test('returns the result of the card function and passes a schema context', () => {
    const cardDetails: HcimCardDetails = {
        title: faker.lorem.word(),
        description: faker.lorem.sentence(),
    };
    const cardFunc = vi.fn(() => cardDetails);
    mockGetResourceConfig.mockImplementation(
        () => ({ card: cardFunc }) as unknown as AnyResourceConfig
    );

    const mgoResource = {
        id: faker.lorem.word(),
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const options = { locale: 'nl-NL' } as SchemaOptions<'R3'>;
    const result = getCard(mgoResource as MgoResource<'R3'>, options);

    expect(result).toEqual(cardDetails);
    expect(cardFunc).toHaveBeenCalledWith(
        mgoResource,
        expect.objectContaining({ isSummary: true })
    );
});

test('defaults to nl-NL locale when no options are passed', () => {
    const cardDetails: HcimCardDetails = { title: faker.lorem.word() };
    const cardFunc = vi.fn(() => cardDetails);
    mockGetResourceConfig.mockImplementation(
        () => ({ card: cardFunc }) as unknown as ResourceConfig<any, any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
    );

    const mgoResource = {
        id: faker.lorem.word(),
        resourceType: faker.lorem.word(),
        profile: faker.lorem.word(),
    };

    const result = getCard(mgoResource as MgoResource<'R3'>);

    expect(result).toEqual(cardDetails);
    expect(cardFunc).toHaveBeenCalledWith(
        mgoResource,
        expect.objectContaining({ isSummary: true })
    );
});
