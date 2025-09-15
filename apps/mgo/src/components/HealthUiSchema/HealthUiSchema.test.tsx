import { type Resource } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { getDetails, getSummary } from '@minvws/mgo-hcim';
import { type HealthUiSchema as HealthUiSchemaData } from '@minvws/mgo-hcim-ui';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { HealthUiSchema } from './HealthUiSchema';

const mockGetDetails = getDetails as MockedFunction<typeof getDetails>;
const mockGetSummary = getSummary as MockedFunction<typeof getSummary>;

vi.mock('@minvws/mgo-hcim', (importActual) => ({
    ...importActual,
    getSummary: vi.fn(),
    getDetails: vi.fn(),
}));

function mockResource(): Resource {
    return {
        mgoResource: {},
    } as Resource;
}

afterEach(() => {
    mockGetDetails.mockReset();
    mockGetSummary.mockReset();
});

test('shows summary when summary is true', () => {
    const schema: HealthUiSchemaData = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: faker.lorem.sentence(),
                children: [],
            },
        ],
    };
    mockGetSummary.mockImplementationOnce(() => schema);
    setupWithAppProviders(<HealthUiSchema resource={mockResource()} summary />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(schema.label);
    screen.getByRole('heading', {
        name: schema.children[0].label,
        level: 2,
    });
});

test('shows details by default', () => {
    const schema: HealthUiSchemaData = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: faker.lorem.sentence(),
                children: [],
            },
        ],
    };
    mockGetDetails.mockImplementationOnce(() => schema);

    setupWithAppProviders(<HealthUiSchema resource={mockResource()} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(schema.label);
    screen.getByRole('heading', {
        name: schema.children[0].label,
        level: 2,
    });
});
