import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createVaccinationsClient } from '../../createVaccinationsClient/createVaccinationsClient';

const { getVaccinations } = createVaccinationsClient({
    prefixUrl: FHIR_API_URL,
});

test('getVaccinations', () =>
    testRequestHandler(getVaccinations, 'Immunization', {
        _include: 'patient,location,performer',
    }));
