import { test } from 'vitest';
import { createCommonClinicalDatasetService } from '../..';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';

const { getLastBloodPressure, getLastBodyWeight, getLastBodyHeight } =
    createCommonClinicalDatasetService({
        prefixUrl: MOCK_SERVER_URL,
    });

test('getLastBloodPressure', () =>
    testRequestHandler(getLastBloodPressure, 'Observation/$lastn', {
        code: 'http://loinc.org|85354-9', // NOSONAR
    }));

test('getLastBodyWeight', () =>
    testRequestHandler(getLastBodyWeight, 'Observation/$lastn', {
        code: 'http://loinc.org|29463-7', // NOSONAR
    }));

test('getLastBodyHeight', () =>
    testRequestHandler(getLastBodyHeight, 'Observation/$lastn', {
        code: [
            'http://loinc.org|8302-2', // NOSONAR
            'http://loinc.org|8306-3', // NOSONAR
            'http://loinc.org|8308-9', // NOSONAR
        ].join(','),
    }));
