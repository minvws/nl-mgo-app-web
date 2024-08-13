import * as hooks from '$/hooks';
import { faker } from '$test/faker';
import { flushCallStack, message, setupWithAppProviders } from '$test/helpers';
import { screen } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Document } from './Document';
import fhirDocumentReference from './fixtures/fhir-document-reference.json';

const useOrganizationMock = vi.spyOn(hooks, 'useOrganization');

test('shows document detail page', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () => null,
        getDocumentDataset: () =>
            ({
                getDocumentReference: () => ({
                    json: vi.fn(() => Promise.resolve(fhirDocumentReference)),
                }),
            }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any,
    }));

    setupWithAppProviders(<Document />);
    await flushCallStack(2);

    screen.getByRole('heading', {
        name: 'Discharge summary',
    });
});

test('shows no results when there is no data service available', async () => {
    const organization = faker.custom.healthcareOrganization();
    useOrganizationMock.mockImplementation(() => ({
        organization,
        getCommonClinicalDataset: () => null,
        getDocumentDataset: () => null,
    }));

    setupWithAppProviders(<Document />);
    await flushCallStack();

    screen.getByRole('heading', {
        name: message('not_found.heading'),
    });
});
