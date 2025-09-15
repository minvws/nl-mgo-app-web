import { faker } from '$test/faker';
import { HealthUiSchema } from '@minvws/mgo-hcim-ui';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { SubCategory } from './SubCategory';

vi.mock('@react-pdf/renderer');

test('renders all schemas correctly', () => {
    const schemas = mockArray<HealthUiSchema>({
        min: 1,
        max: 10,
        factory: () => ({
            label: faker.lorem.sentence(),
            children: [],
        }),
    });
    const heading = faker.lorem.sentence();
    const noDataMessage = faker.lorem.sentence();

    render(<SubCategory heading={heading} schemas={schemas} noDataMessage={noDataMessage} />);

    const subcategoryHeading = screen.getByTestId('subcategory-heading');
    expect(subcategoryHeading).toHaveTextContent(heading);

    const schemaLabels = screen.getAllByTestId('schema-label');
    expect(schemaLabels).toHaveLength(schemas.length);
    expect(schemaLabels[0]).toHaveTextContent(schemas[0].label);
});

test('renders no data message for sub categories without schemas', () => {
    const schemas = [] as HealthUiSchema[];
    const heading = faker.lorem.sentence();
    const noDataMessage = faker.lorem.sentence();

    render(<SubCategory heading={heading} schemas={schemas} noDataMessage={noDataMessage} />);

    const subcategoryHeading = screen.getByTestId('subcategory-heading');
    expect(subcategoryHeading).toHaveTextContent(heading);

    const schemaLabels = screen.queryAllByTestId('schema-label');
    expect(schemaLabels).toHaveLength(0);

    const noDataMessageElement = screen.getByText(noDataMessage);
    expect(noDataMessageElement).toBeInTheDocument();
});
