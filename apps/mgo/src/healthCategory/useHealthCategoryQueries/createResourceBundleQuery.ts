import { useResourcesStore, type HealthcareOrganization } from '$/store';
import { type DataService } from '@minvws/mgo-fhir-client';
import { getBundleMgoResources, isFhirResource, type FhirResource } from '@minvws/mgo-fhir-data';
import { type UseQueryOptions } from '@tanstack/react-query';
import { HealthCategory } from '../HealthCategory';

type FetchResponse = { json: () => Promise<unknown> };
type SafeReturnType<T> = T extends (...args: any) => any ? ReturnType<T> : unknown; // eslint-disable-line @typescript-eslint/no-explicit-any
export type ServiceRequestKeys<T extends DataService> = {
    [K in keyof T]: SafeReturnType<T[K]> extends FetchResponse ? K : never;
}[keyof T];

export interface ResourceQueryConfig<T extends DataService> {
    organization: HealthcareOrganization;
    service: T | null;
    method: ServiceRequestKeys<T>;
}

export function createResourceBundleQuery<T extends DataService>({
    organization,
    service,
    method,
}: ResourceQueryConfig<T>): UseQueryOptions | undefined {
    if (!service) return;

    return {
        staleTime: Infinity,

        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: [organization.id, service.dataServiceId, HealthCategory.Medication, method],

        queryFn: async () => {
            const bundle = await (service[method] as () => FetchResponse)().json();

            if (!isFhirResource(bundle, 'Bundle')) {
                throw new Error(
                    `Response for service: ${service.dataServiceId}: ${String(method)} - does not seem to contain a Fhir Bundle. Received resourceType: "${(bundle as FhirResource)?.resourceType}"`
                );
            }

            const mgoResources = getBundleMgoResources(bundle);

            if (mgoResources?.length) {
                const resourceStore = useResourcesStore.getState();
                const mgoResourcesDtos = mgoResources.map((mgoResource) => ({
                    dataServiceId: service.dataServiceId,
                    organizationId: organization.id,
                    mgoResource,
                }));
                resourceStore.addResources(mgoResourcesDtos);
            }
        },
    };
}
