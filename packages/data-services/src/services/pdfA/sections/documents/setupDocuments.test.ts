import { test } from 'vitest';
import { createPdfAService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getDocumentReferences } = createPdfAService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getDocumentReferences', () => {
    testRequestHandler(getDocumentReferences, 'DocumentReference');
});
