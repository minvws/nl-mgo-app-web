import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createVaccinationImmunizationService } from '../..';

const { getVaccinations } = createVaccinationImmunizationService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getVaccinations', () => testRequestHandler(getVaccinations, 'Immunization'));
