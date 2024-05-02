import { createClient } from '@minvws/mgo-fhir-client';

export const { getResource, getResources } = createClient({
    prefixUrl: 'https://dva.test.mgo.irealisatie.nl/fhir/',
    timeout: 10000,
});
