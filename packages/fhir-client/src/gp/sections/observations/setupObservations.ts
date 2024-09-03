import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupObservations({ getResources }: FhirClient) {
    return {
        getDiagnosticAndLabResults: partialRequest(
            getResources,
            {
                resource: 'Observation',
            } as const,
            {
                searchParams: {
                    code: 'https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|',
                    _include: 'Observation:related-target,Observation:specimen',
                },
            }
        ),
    };
}
