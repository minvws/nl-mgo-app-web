import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupMedicalAids({ getResources }: FhirClient) {
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
