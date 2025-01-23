import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createCommonClinicalDatasetService } from '../..';

const {
    getPlannedProcedures,
    getPlannedImmunizations,
    getPlannedMedicalDevices,
    getPlannedEncounters,
} = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
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
