import { test } from 'vitest';
import { FHIR_API_URL } from '../../../../test/server';
import { testRequestHandler } from '../../../../test/testRequestHandler';
import { createGpClient } from '../../createGpClient/createGpClient';

const { getDiagnosticAndLabResults } = createGpClient({ prefixUrl: FHIR_API_URL });

test('getDiagnosticAndLabResults', () =>
    testRequestHandler(getDiagnosticAndLabResults, 'Observation', {
        code: 'https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|',
        _include: 'Observation:related-target,Observation:specimen',
    }));
