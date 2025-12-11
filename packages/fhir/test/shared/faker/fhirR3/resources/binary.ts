import { Binary } from '@minvws/mgo-fhir/r3';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { reference } from '../type/reference.js';

const blankPdfBase64 =
    'JVBERi0xLjEKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nIC9QYWdlcyAyIDAgUj4+CmVuZG9iago' +
    '2IDAgb2JqCjw8L1R5cGUgL1BhZ2VzIC9Db3VudCAxIC9LaWRzIFsgMyAwIFIgXTw+CmVuZG9iag' +
    'ozIDAgb2JqCjw8L1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCAyMDAgM' +
    'jAwXTw+CmVuZG9iagp0cmFpbGVyCjw8L1Jvb3QgMSAwIFI+PgplbmRvZgo=';

export const binary = createMockFactory<Binary>(() => {
    return {
        resourceType: 'Binary' as const,
        contentType: 'application/pdf',
        content: blankPdfBase64,
        securityContext: reference(),
    };
});
