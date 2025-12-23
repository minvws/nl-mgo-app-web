import { fetchHealthData, HealthRequest } from './fetchHealthData';

export interface HealthQueryOptions {
    organizationId: string;
    dataServiceId: string;
    resourceEndpoint: string;
    endpointId: string;
}

export const HEALTH_QUERY_KEY = 'health';

export function createHealthQuery(query: HealthQueryOptions) {
    const { organizationId, dataServiceId, resourceEndpoint, endpointId } = query;

    return {
        meta: {
            organizationId,
            dataServiceId,
            endpointId,
        },
        queryKey: [HEALTH_QUERY_KEY, organizationId, resourceEndpoint, dataServiceId, endpointId],
        queryFn: async () => {
            const request: HealthRequest = {
                dataServiceId,
                resourceEndpoint,
                endpointId,
            };

            return await fetchHealthData(request);
        },
        staleTime: Infinity,
    };
}

export type HealthQueryConfig = ReturnType<typeof createHealthQuery>;
