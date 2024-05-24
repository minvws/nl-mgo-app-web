import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupPlannedCare({ getResources }: FhirClient) {
    return {
        getPlannedProcedures: partialRequest(
            getResources,
            {
                resource: 'ProcedureRequest',
            } as const,
            {
                searchParams: { status: 'active' },
            }
        ),

        getPlannedImmunizations: partialRequest(getResources, {
            resource: 'ImmunizationRecommendation',
        } as const),

        getPlannedMedicalDevices: partialRequest(
            getResources,
            {
                resource: 'DeviceRequest',
            } as const,
            {
                searchParams: { status: 'active', _include: 'DeviceRequest:device' },
            }
        ),

        getPlannedEncounters: partialRequest(
            getResources,
            {
                resource: 'Appointment',
            } as const,
            {
                searchParams: { status: ['booked', 'pending', 'proposed'].join(',') },
            }
        ),
    };
}
