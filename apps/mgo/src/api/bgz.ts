import { createBgzClient } from '@minvws/mgo-fhir-client';

export const bgz = createBgzClient({
    prefixUrl: 'https://dva.test.mgo.irealisatie.nl/fhir/',
    timeout: 10000,
});
