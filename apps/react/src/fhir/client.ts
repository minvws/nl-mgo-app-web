import { createClient } from '@minvws/mgo-fhir-client';

export const { getResource } = createClient({
    prefixUrl: 'http://localhost:8080/hapi-fhir-jpaserver/fhir/',
    timeout: 30000,
});
