import { type Resource } from '$/store';
import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import {
    getSummaryUiSchema,
    getUiSchema,
    type UiSchema as UiSchemaData,
} from '@minvws/mgo-fhir-data';
import { screen } from '@testing-library/react';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { UiSchema } from './UiSchema';

const mockGetUiSchema = getUiSchema as MockedFunction<typeof getUiSchema>;
const mockGetSummaryUiSchema = getSummaryUiSchema as MockedFunction<typeof getUiSchema>;

vi.mock('@minvws/mgo-fhir-data', (importActual) => ({
    ...importActual,
    getSummaryUiSchema: vi.fn(),
    getUiSchema: vi.fn(),
}));

function mockResource(): Resource {
    return {
        mgoResource: {},
    } as Resource;
}

afterEach(() => {
    mockGetUiSchema.mockReset();
    mockGetSummaryUiSchema.mockReset();
});

test('shows summary for a resource by default', () => {
    const schema: UiSchemaData = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: faker.lorem.sentence(),
                children: [],
            },
        ],
    };
    mockGetSummaryUiSchema.mockImplementationOnce(() => schema);
    setupWithAppProviders(<UiSchema resource={mockResource()} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(schema.label);
    screen.getByRole('heading', {
        name: schema.children[0].label,
        level: 2,
    });
});

test('shows details for a resource when showDetails is true', () => {
    const schema: UiSchemaData = {
        label: faker.lorem.sentence(),
        children: [
            {
                label: faker.lorem.sentence(),
                children: [],
            },
        ],
    };
    mockGetUiSchema.mockImplementationOnce(() => schema);

    setupWithAppProviders(<UiSchema showDetails resource={mockResource()} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(schema.label);
    screen.getByRole('heading', {
        name: schema.children[0].label,
        level: 2,
    });
});
