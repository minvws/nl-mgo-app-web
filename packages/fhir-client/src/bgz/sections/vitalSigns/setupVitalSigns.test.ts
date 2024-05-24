import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createBgzClient } from '../../createBgzClient/createBgzClient';

const { getLastBloodPressure, getLastBodyWeight, getLastBodyHeight } = createBgzClient({
    prefixUrl: FHIR_API_URL,
});

test('getLastBloodPressure', () =>
    testRequestHandler(getLastBloodPressure, 'Observation/$lastn', {
        code: 'http://loinc.org|85354-9',
    }));

test('getLastBodyWeight', () =>
    testRequestHandler(getLastBodyWeight, 'Observation/$lastn', {
        code: 'http://loinc.org|29463-7',
    }));

test('getLastBodyHeight', () =>
    testRequestHandler(getLastBodyHeight, 'Observation/$lastn', {
        code: [
            'http://loinc.org|8302-2',
            'http://loinc.org|8306-3',
            'http://loinc.org|8308-9',
        ].join(','),
    }));
