import { test } from 'vitest';
import { createCommonClinicalDatasetService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getMedicationUse, getMedicationAgreements, getAdministrationAgreements } =
    createCommonClinicalDatasetService({
        prefixUrl: MOCK_SERVER_URL,
    });

test('getMedicationUse', () =>
    testRequestHandler(getMedicationUse, 'MedicationStatement', {
        category: 'urn:oid:2.16.840.1.113883.2.4.3.11.60.20.77.5.3|6',
        _include: 'MedicationStatement:medication',
    }));

test('getMedicationAgreements', () =>
    testRequestHandler(getMedicationAgreements, 'MedicationRequest', {
        category: 'http://snomed.info/sct|16076005', // NOSONAR
        _include: 'MedicationRequest:medication',
    }));

test('getAdministrationAgreements', () =>
    testRequestHandler(getAdministrationAgreements, 'MedicationDispense', {
        category: 'http://snomed.info/sct|422037009', // NOSONAR
        _include: 'MedicationDispense:medication',
    }));
