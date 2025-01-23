import { test } from 'vitest';
import { createCommonClinicalDatasetService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const {
    getCurrentLivingSituation,
    getDrugUse,
    getAlcoholUse,
    getTobaccoUse,
    getDietaryRecommendations,
} = createCommonClinicalDatasetService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getCurrentLivingSituation', () =>
    testRequestHandler(getCurrentLivingSituation, 'Observation/$lastn', {
        code: 'http://snomed.info/sct|365508006', // NOSONAR
    }));

test('getDrugUse', () =>
    testRequestHandler(getDrugUse, 'Observation', {
        code: 'http://snomed.info/sct|228366006', // NOSONAR
    }));

test('getAlcoholUse', () =>
    testRequestHandler(getAlcoholUse, 'Observation', {
        code: 'http://snomed.info/sct|228273003', // NOSONAR
    }));

test('getTobaccoUse', () =>
    testRequestHandler(getTobaccoUse, 'Observation', {
        code: 'http://snomed.info/sct|365980008', // NOSONAR
    }));

test('getDietaryRecommendations', () =>
    testRequestHandler(getDietaryRecommendations, 'NutritionOrder'));
