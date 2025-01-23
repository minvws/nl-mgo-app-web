import { type FhirClient, type FhirVersion } from '@minvws/mgo-fhir-client';
import { partialRequest } from '../../../../utils/partialRequest/partialRequest';

export function setupSocialHistory<V extends FhirVersion>({ getResources }: FhirClient<V>) {
    return {
        getCurrentLivingSituation: partialRequest(
            getResources,
            {
                resource: 'Observation',
                $lastn: true,
            } as const,
            {
                searchParams: {
                    code: 'http://snomed.info/sct|365508006', // NOSONAR
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
                    code: 'http://snomed.info/sct|228366006', // NOSONAR
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
                    code: 'http://snomed.info/sct|228273003', // NOSONAR
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
                    code: 'http://snomed.info/sct|365980008', // NOSONAR
                },
            }
        ),

        getDietaryRecommendations: partialRequest(getResources, {
            resource: 'NutritionOrder',
        } as const),
    };
}
