import * as hooks from '$/hooks';
import { faker } from '$test/faker';
import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Documents } from './Documents';
import fhirDocumentReferences from './fixtures/fhir-document-references.json';

const useOrganizationMock = vi.spyOn(hooks, 'useOrganization');

test('shows documents list', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () => null,
        getDocumentDataset: () =>
            ({
                getDocumentReferences: () => ({
                    json: vi.fn(() => Promise.resolve(fhirDocumentReferences)),
                }),
            }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any,
    }));

    setupWithAppProviders(<Documents />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Documenten',
    });
});

test('shows no results when there is no data service available', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () => null,
        getDocumentDataset: () => null,
    }));

    setupWithAppProviders(<Documents />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: message('common.no_results_heading'),
    });
});
