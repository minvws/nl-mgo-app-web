import { faker } from '$test/faker';
import { type MockedFunction, expect, test, vi, afterEach } from 'vitest';
import { createDocumentsClient } from '@minvws/mgo-fhir-client';
import { getDocumentsService } from './documents';

const createDocumentsClientMock = createDocumentsClient as MockedFunction<
    typeof createDocumentsClient
>;

vi.mock('@minvws/mgo-fhir-client', () => ({
    createDocumentsClient: vi.fn(() => ({})),
}));

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the documents service when there is a resource endpoint available', () => {
    const documentsResource = faker.internet.url();
    const organization = faker.custom.healthcareOrganization({
        resourceEndpoints: { documents: documentsResource },
    });
    const documents = getDocumentsService(organization);

    expect(documents).not.toBeNull();
    expect(createDocumentsClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': documentsResource,
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const documents = getDocumentsService(undefined);

    expect(documents).toBeNull();
    expect(createDocumentsClientMock).not.toHaveBeenCalled();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.resourceEndpoints.documents = undefined;

    const documents = getDocumentsService(organization);

    expect(documents).toBeNull();
    expect(createDocumentsClientMock).not.toHaveBeenCalled();
});
