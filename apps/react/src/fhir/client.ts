/* c8 ignore start */

import { createClient } from '@minvws/pgo-fhir-client';

export const { getResource } = createClient({
    prefixUrl: 'http://localhost:8080/hapi-fhir-jpaserver/fhir/',
    timeout: 30000,
});
