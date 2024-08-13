import { faker } from '$test/faker';
import { type MockedFunction, expect, test, vi, afterEach } from 'vitest';
import { createDocumentsClient } from '@minvws/mgo-fhir-client';
import { getDocumentDataset } from './documentDataset';

const createDocumentsClientMock = createDocumentsClient as MockedFunction<
    typeof createDocumentsClient
>;

vi.mock('@minvws/mgo-fhir-client', () => ({
    createDocumentsClient: vi.fn(() => ({})),
}));

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the document dataset client when there is a resource endpoint available', () => {
    const documentDatasetResource = faker.internet.url();
    const organization = faker.custom.healthcareOrganization({
        resourceEndpoints: { documents: documentDatasetResource },
    });
    const documentDataset = getDocumentDataset(organization);

    expect(documentDataset).not.toBeNull();
    expect(createDocumentsClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': documentDatasetResource,
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const documentDataset = getDocumentDataset(undefined);

    expect(documentDataset).toBeNull();
    expect(createDocumentsClientMock).not.toHaveBeenCalled();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.resourceEndpoints.documents = undefined;

    const documentDataset = getDocumentDataset(organization);

    expect(documentDataset).toBeNull();
    expect(createDocumentsClientMock).not.toHaveBeenCalled();
});
