import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createDocumentsClient } from '../../createDocumentsClient/createDocumentsClient';

const { getDocumentReferences, getDocumentReference } = createDocumentsClient({
    prefixUrl: FHIR_API_URL,
});

test('getDocumentReferences', () =>
    testRequestHandler(getDocumentReferences, 'DocumentReference', {
        status: 'current',
    }));

test('getDocumentReference', () =>
    testRequestHandler(() => getDocumentReference('1'), 'DocumentReference/1'));
