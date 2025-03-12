import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createPdfAService } from '../..';
import { faker } from '@faker-js/faker';

const { getDocumentReferences, getDocumentReference } = createPdfAService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getDocumentReferences', () => {
    testRequestHandler(getDocumentReferences, 'DocumentReference');
});

test('getDocumentReference', () => {
    const id = faker.lorem.word();
    testRequestHandler(() => getDocumentReference(id), `DocumentReference/${id}`);
});
