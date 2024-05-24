import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getMedicationUse, getMedicationAgreements, getAdministrationAgreements } = createBgzClient({
    prefixUrl: FHIR_API_URL,
});

test('getMedicationUse', () =>
    testRequestHandler(getMedicationUse, 'MedicationStatement', {
        category: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.20.77.5.3|6',
        _include: 'MedicationStatement:medication',
    }));

test('getMedicationAgreements', () =>
    testRequestHandler(getMedicationAgreements, 'MedicationStatement', {
        category: 'http://snomed.info/sct|16076005',
        _include: 'MedicationStatement:medication',
    }));

test('getAdministrationAgreements', () =>
    testRequestHandler(getAdministrationAgreements, 'MedicationStatement', {
        category: 'http://snomed.info/sct|422037009',
        _include: 'MedicationDispense:medication',
    }));
