import { fetchHealthData, HealthRequest } from './fetchHealthData';

export interface HealthQueryOptions {
    organizationId: string;
    dataServiceId: string;
    resourceEndpoint: string;
    endpointId: string;
}

export function createHealthQuery(query: HealthQueryOptions) {
    const { organizationId, dataServiceId, resourceEndpoint, endpointId } = query;

    return {
        meta: {
            organizationId,
            resourceEndpoint,
            dataServiceId,
            endpointId,
        },
        queryKey: ['health', organizationId, resourceEndpoint, dataServiceId, endpointId],
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
