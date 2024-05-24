import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const {
    getPlannedProcedures,
    getPlannedImmunizations,
    getPlannedMedicalDevices,
    getPlannedEncounters,
} = createBgzClient({
    prefixUrl: FHIR_API_URL,
});

test('getPlannedProcedures', () =>
    testRequestHandler(getPlannedProcedures, 'ProcedureRequest', { status: 'active' }));

test('getPlannedImmunizations', () =>
    testRequestHandler(getPlannedImmunizations, 'ImmunizationRecommendation'));

test('getPlannedMedicalDevices', () =>
    testRequestHandler(getPlannedMedicalDevices, 'DeviceRequest', {
        status: 'active',
        _include: 'DeviceRequest:device',
    }));

test('getPlannedEncounters', () =>
    testRequestHandler(getPlannedEncounters, 'Appointment', {
        status: ['booked', 'pending', 'proposed'].join(','),
    }));
