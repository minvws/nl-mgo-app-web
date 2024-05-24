import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const {
    getCurrentLivingSituation,
    getDrugUse,
    getAlcoholUse,
    getTobaccoUse,
    getDietaryRecommendations,
} = createBgzClient({
    prefixUrl: FHIR_API_URL,
});

test('getCurrentLivingSituation', () =>
    testRequestHandler(getCurrentLivingSituation, 'Observation/$lastn', {
        code: 'http://snomed.info/sct|365508006',
    }));

test('getDrugUse', () =>
    testRequestHandler(getDrugUse, 'Observation', {
        code: 'http://snomed.info/sct|228366006',
    }));

test('getAlcoholUse', () =>
    testRequestHandler(getAlcoholUse, 'Observation', {
        code: 'http://snomed.info/sct|228273003',
    }));

test('getTobaccoUse', () =>
    testRequestHandler(getTobaccoUse, 'Observation', {
        code: 'http://snomed.info/sct|365980008',
    }));

test('getDietaryRecommendations', () =>
    testRequestHandler(getDietaryRecommendations, 'NutritionOrder'));
