import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupPaymentDetails({ getResources }: FhirClient) {
    return {
        getInsuranceInformation: partialRequest(
            getResources,
            {
                resource: 'Coverage',
            } as const,
            {
                searchParams: [
                    ['_include', 'Coverage:payor:Patient'],
                    ['_include', 'Coverage:payor:Organization'],
                ],
            }
        ),
    };
}
