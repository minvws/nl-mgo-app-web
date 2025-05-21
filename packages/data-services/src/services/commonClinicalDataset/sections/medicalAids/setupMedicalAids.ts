import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupMedicalAids<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getMedicalAids: partialRequest(
            getResources,
            {
                resource: 'DeviceUseStatement',
            } as const,
            {
                searchParams: {
                    _include: 'DeviceUseStatement:device',
                },
            }
        ),
    };
}
