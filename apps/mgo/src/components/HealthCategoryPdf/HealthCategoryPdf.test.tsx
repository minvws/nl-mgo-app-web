import { faker } from '$test/faker';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HealthCategoryPdf, type HealthCategoryPdfProps } from './HealthCategoryPdf';

vi.mock('@react-pdf/renderer');

type SubCategory = HealthCategoryPdfProps['subCategories'][number];

test('renders PDF Document with correct structure', () => {
    const heading = faker.lorem.sentence();
    const subHeading = faker.lorem.sentence();
    const footerText = faker.lorem.sentence();
    const noDataMessage = faker.lorem.sentence();
    const subCategories = mockArray<SubCategory>({
        min: 2,
        max: 10,
        factory: () => ({
            heading: faker.lorem.sentence(),
            schemas: [],
        }),
    });

    render(
        <HealthCategoryPdf
            heading={heading}
            subHeading={subHeading}
            footerText={footerText}
            noDataMessage={noDataMessage}
            subCategories={subCategories}
        />
    );

    const pdfHeading = screen.getByTestId('pdf-heading');
    expect(pdfHeading).toHaveTextContent(heading);

    const pdfSubHeading = screen.getByTestId('pdf-subheading');
    expect(pdfSubHeading).toHaveTextContent(subHeading);

    const schemaLabels = screen.getAllByTestId('subcategory-heading');
    expect(schemaLabels).toHaveLength(subCategories.length);
    expect(schemaLabels[0]).toHaveTextContent(subCategories[0].heading);
});
