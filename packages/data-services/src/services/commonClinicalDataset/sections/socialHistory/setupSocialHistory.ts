import {
    ResourcesResponsePromise,
    type FhirClient,
    type FhirVersion,
} from '@minvws/mgo-fhir-client';

type SocialHistoryService<V extends FhirVersion> = {
    getCurrentLivingSituation: () => ResourcesResponsePromise<V, 'Observation'>;
    getDrugUse: () => ResourcesResponsePromise<V, 'Observation'>;
    getAlcoholUse: () => ResourcesResponsePromise<V, 'Observation'>;
    getTobaccoUse: () => ResourcesResponsePromise<V, 'Observation'>;
    getDietaryRecommendations: () => ResourcesResponsePromise<V, 'NutritionOrder'>;
};

export function setupSocialHistory<V extends FhirVersion>({
    getResources,
}: FhirClient<V>): SocialHistoryService<V> {
    return {
        getCurrentLivingSituation: () =>
            getResources(
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

        getDrugUse: () =>
            getResources(
                {
                    resource: 'Observation',
                } as const,
                {
                    searchParams: {
                        code: 'http://snomed.info/sct|228366006', // NOSONAR
                    },
                }
            ),

        getAlcoholUse: () =>
            getResources(
                {
                    resource: 'Observation',
                } as const,
                {
                    searchParams: {
                        code: 'http://snomed.info/sct|228273003', // NOSONAR
                    },
                }
            ),

        getTobaccoUse: () =>
            getResources(
                {
                    resource: 'Observation',
                } as const,
                {
                    searchParams: {
                        code: 'http://snomed.info/sct|365980008', // NOSONAR
                    },
                }
            ),

        getDietaryRecommendations: () =>
            getResources({
                resource: 'NutritionOrder',
            } as const),
    };
}
