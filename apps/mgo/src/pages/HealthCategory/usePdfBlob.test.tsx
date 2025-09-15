import { render, renderHook } from '@testing-library/react';
import { type ReactNode } from 'react';
import { beforeEach, expect, test, vi } from 'vitest';
import { faker } from '$test/faker';
import { usePdfBlob } from './usePdfBlob';
import { type HealthSubCategory } from './SubCategoryData';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { HealthUiSchema } from '@minvws/mgo-hcim';
import { HealthCategoryPdfProps } from '$/components/HealthCategoryPdf/HealthCategoryPdf';
import { Resource } from '$/store';
import { TestAppProviders } from '$test/helpers';

const mockToBlob = vi.fn().mockResolvedValue(new Blob(['mock-pdf'], { type: 'application/pdf' }));
const mockPdf = vi.fn((pdf: ReactNode) => {
    render(pdf);
    return {
        toBlob: mockToBlob,
    };
});

vi.mock('@react-pdf/renderer', () => ({
    pdf: mockPdf,
}));

const pdfPropsSpy: HealthCategoryPdfProps[] = [];

vi.mock('$/components/HealthCategoryPdf/HealthCategoryPdf', () => {
    return {
        HealthCategoryPdf: vi.fn((props: HealthCategoryPdfProps) => {
            pdfPropsSpy.push(props);
            return <div data-testid="mock-special" />;
        }),
    };
});

beforeEach(() => {
    vi.clearAllMocks();
    pdfPropsSpy.length = 0;
});

test('createPdfBlob generates PDF', async () => {
    const categoryHeading = faker.lorem.sentence();
    const subCategories: HealthSubCategory[] = mockArray<HealthSubCategory>({
        min: 2,
        max: 10,
        factory: () => ({
            id: faker.string.uuid(),
            heading: faker.lorem.sentence(),
            schemas: [],
            resources: [],
        }),
    });

    const { result } = renderHook(() => usePdfBlob(), {
        wrapper: (props) => <TestAppProviders {...props} />,
    });

    const blob = await result.current.createPdfBlob({
        categoryHeading,
        subCategories,
    });

    expect(mockPdf).toHaveBeenCalled();
    expect(mockToBlob).toHaveBeenCalled();
    expect(blob).toBeInstanceOf(Blob);
});

test('createPdfBlob does not render last uiGroup in PDF', async () => {
    const categoryHeading = faker.lorem.sentence();
    const subCategories: HealthSubCategory[] = mockArray<HealthSubCategory>({
        min: 2,
        max: 10,
        factory: () => ({
            id: faker.string.uuid(),
            heading: faker.lorem.sentence(),
            resources: [
                {
                    summary: {
                        label: faker.lorem.words(2),
                        children: [
                            { label: 'Option 1', children: [] },
                            { label: 'Option 2', children: [] },
                            { label: 'Detail Link', children: [] },
                        ],
                    } as HealthUiSchema,
                } as Resource,
            ],
        }),
    });

    const { result } = renderHook(() => usePdfBlob(), {
        wrapper: (props) => <TestAppProviders {...props} />,
    });

    const blob = await result.current.createPdfBlob({
        categoryHeading,
        subCategories,
    });

    expect(mockPdf).toHaveBeenCalledTimes(1);
    expect(mockToBlob).toHaveBeenCalledTimes(1);
    expect(blob).toBeInstanceOf(Blob);

    const { subCategories: processedSubCategories } = pdfPropsSpy[0] ?? {};

    expect(processedSubCategories).toBeDefined();

    const allSchemas = processedSubCategories.flatMap((subCategories) => subCategories.schemas);
    allSchemas.forEach((schema) => expect(schema.children).lengthOf(2));
});

test('createPdfBlob throws error when no categories are given', async () => {
    const categoryHeading = faker.lorem.sentence();

    const { result } = renderHook(() => usePdfBlob(), {
        wrapper: (props) => <TestAppProviders {...props} />,
    });

    await expect(
        result.current.createPdfBlob({
            categoryHeading,
        })
    ).rejects.toThrow();
});
