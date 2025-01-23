import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupVitalSigns<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getLastBloodPressure: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: {
                    code: 'http://loinc.org|85354-9', // NOSONAR
                },
            }
        ),

        getLastBodyWeight: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: {
                    code: 'http://loinc.org|29463-7', // NOSONAR
                },
            }
        ),

        getLastBodyHeight: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: {
                    code: [
                        'http://loinc.org|8302-2', // NOSONAR
                        'http://loinc.org|8306-3', // NOSONAR
                        'http://loinc.org|8308-9', // NOSONAR
                    ].join(','),
                },
            }
        ),
    };
}
