import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { appMessage } from '@minvws/mgo-intl/test/shared';
import { mockArray } from '@minvws/mgo-utils/test/shared';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import { PdfDownloadLink } from './PdfDownloadLink';
import { type HealthSubCategory } from './SubCategoryData';

const mockCreatePdfBlob = vi.fn();

vi.mock('./usePdfBlob', () => ({
    usePdfBlob: vi.fn(() => ({
        createPdfBlob: mockCreatePdfBlob,
    })),
}));

beforeEach(() => {
    mockCreatePdfBlob.mockReset();
});

const mockSubCategories = (): HealthSubCategory[] =>
    mockArray<HealthSubCategory>({
        min: 1,
        max: 3,
        factory: () => ({
            id: faker.string.uuid(),
            heading: faker.lorem.sentence(),
            resources: [],
        }),
    });

test('renders pdf download button', () => {
    setupWithAppProviders(
        <PdfDownloadLink
            categoryHeading={faker.lorem.sentence()}
            subCategories={mockSubCategories()}
        />
    );

    expect(
        screen.getByRole('button', { name: appMessage('export_pdf.menu.save_pdf') })
    ).toBeInTheDocument();
});

test('opens confirm dialog when button is clicked', async () => {
    const categoryHeading = faker.lorem.sentence();
    const subCategories = mockSubCategories();

    const { user } = setupWithAppProviders(
        <PdfDownloadLink categoryHeading={categoryHeading} subCategories={subCategories} />
    );

    const button = screen.getByRole('button', { name: appMessage('export_pdf.menu.save_pdf') });
    await user.click(button);

    expect(screen.getByText(appMessage('export_pdf.dialog.heading'))).toBeInTheDocument();
    expect(screen.getByText(appMessage('export_pdf.dialog.subheading_web'))).toBeInTheDocument();
});

test('creates and downloads pdf when confirm button is clicked', async () => {
    const categoryHeading = faker.lorem.sentence();
    const subCategories = mockSubCategories();
    const mockBlob = new Blob(['mock-pdf'], { type: 'application/pdf' });

    mockCreatePdfBlob.mockResolvedValue(mockBlob);

    const mockCreateObjectURL = vi.fn().mockReturnValue('mock-url');
    const mockWindowOpen = vi.fn();

    global.URL.createObjectURL = mockCreateObjectURL;
    global.window.open = mockWindowOpen;

    const { user } = setupWithAppProviders(
        <PdfDownloadLink categoryHeading={categoryHeading} subCategories={subCategories} />
    );

    const button = screen.getByRole('button', { name: appMessage('export_pdf.menu.save_pdf') });
    await user.click(button);

    const confirmButton = screen.getByRole('button', {
        name: appMessage('export_pdf.dialog.create_document'),
    });
    await user.click(confirmButton);

    await waitFor(() => {
        expect(mockCreatePdfBlob).toHaveBeenCalledWith({
            subCategories,
            categoryHeading,
        });
    });

    await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
        expect(mockWindowOpen).toHaveBeenCalledWith('mock-url', '_blank');
    });
});

test('closes dialog when cancel button is clicked', async () => {
    const categoryHeading = faker.lorem.sentence();
    const subCategories = mockSubCategories();

    const { user } = setupWithAppProviders(
        <PdfDownloadLink categoryHeading={categoryHeading} subCategories={subCategories} />
    );

    const button = screen.getByRole('button', { name: appMessage('export_pdf.menu.save_pdf') });
    await user.click(button);

    expect(screen.getByText(appMessage('export_pdf.dialog.heading'))).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: appMessage('common.cancel') });
    await user.click(cancelButton);

    await waitFor(() => {
        expect(screen.queryByText(appMessage('export_pdf.dialog.heading'))).not.toBeInTheDocument();
    });
});
