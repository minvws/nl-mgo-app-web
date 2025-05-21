import { test } from 'vitest';
import { MOCK_SERVER_URL, testRequestHandler } from '../../../../../test';
import { createGeneralPractitionerService } from '../..';

const { getDiagnosticAndLabResults } = createGeneralPractitionerService({
    prefixUrl: MOCK_SERVER_URL,
});

test('getDiagnosticAndLabResults', () =>
    testRequestHandler(getDiagnosticAndLabResults, 'Observation', [
        ['code', 'https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|'],
        ['_include', 'Observation:related-target'],
        ['_include', 'Observation:specimen'],
    ]));
