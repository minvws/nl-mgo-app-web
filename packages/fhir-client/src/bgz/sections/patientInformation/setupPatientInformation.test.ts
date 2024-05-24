import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getPatientInformation, getGeneralPractitioner, getFirstRelationOrContact } =
    createBgzClient({ prefixUrl: FHIR_API_URL });

test('getPatientInformation', () =>
    testRequestHandler(getPatientInformation, 'Patient', {
        _include: 'Patient:general-practitioner',
    }));

test('getGeneralPractitioner', () =>
    testRequestHandler(getGeneralPractitioner, 'Patient', {
        _include: 'Patient:general-practitioner',
    }));

test('getFirstRelationOrContact', () =>
    testRequestHandler(getFirstRelationOrContact, 'Patient', {
        _include: 'Patient:general-practitioner',
    }));
