import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getTreatmentDirectives, getAdvanceDirectives } = createBgzClient({
    prefixUrl: FHIR_API_URL,
});

test('getTreatmentDirectives', () =>
    testRequestHandler(getTreatmentDirectives, 'Consent', {
        category: 'http://snomed.info/sct|11291000146105',
    }));

test('getAdvanceDirectives', () =>
    testRequestHandler(getAdvanceDirectives, 'Consent', {
        category: 'http://snomed.info/sct|11341000146107',
    }));
