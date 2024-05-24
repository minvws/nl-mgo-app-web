import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupVitalSigns({ getResources }: FhirClient) {
    return {
        getLastBloodPressure: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: {
                    code: 'http://loinc.org|85354-9',
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
                    code: 'http://loinc.org|29463-7',
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
                        'http://loinc.org|8302-2',
                        'http://loinc.org|8306-3',
                        'http://loinc.org|8308-9',
                    ].join(','),
                },
            }
        ),
    };
}
