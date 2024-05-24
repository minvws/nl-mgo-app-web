import { type FhirClient } from '../../../client/createClient/createClient';
import { partialRequest } from '../../../utils/partialRequest/partialRequest';

export function setupSocialHistory({ getResources }: FhirClient) {
    return {
        getCurrentLivingSituation: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: {
                    code: 'http://snomed.info/sct|365508006',
                },
            }
        ),

        getDrugUse: partialRequest(
            getResources,
            {
                resource: 'Observation',
            } as const,
            {
                searchParams: {
                    code: 'http://snomed.info/sct|228366006',
                },
            }
        ),

        getAlcoholUse: partialRequest(
            getResources,
            {
                resource: 'Observation',
            } as const,
            {
                searchParams: {
                    code: 'http://snomed.info/sct|228273003',
                },
            }
        ),

        getTobaccoUse: partialRequest(
            getResources,
            {
                resource: 'Observation',
            } as const,
            {
                searchParams: {
                    code: 'http://snomed.info/sct|365980008',
                },
            }
        ),

        getDietaryRecommendations: partialRequest(getResources, {
            resource: 'NutritionOrder',
        } as const),
    };
}
