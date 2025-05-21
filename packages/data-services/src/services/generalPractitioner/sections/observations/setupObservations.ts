import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupObservations<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getDiagnosticAndLabResults: partialRequest(
            getResources,
            {
                resource: 'Observation',
            } as const,
            {
                searchParams: [
                    [
                        'code',
                        'https://referentiemodel.nhg.org/tabellen/nhg-tabel-45-diagnostische-bepalingen|',
                    ],
                    ['_include', 'Observation:related-target'],
                    ['_include', 'Observation:specimen'],
                ],
            }
        ),
    };
}
