import { useResourcesStore, type HealthcareOrganization } from '$/store';
import { type DataServiceId, type DataService } from '@minvws/mgo-fhir-client';
import { getBundleMgoResources, isFhirResource, type FhirResource } from '@minvws/mgo-fhir-data';
import { type UseQueryOptions } from '@tanstack/react-query';

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
}: ResourceQueryConfig<T>):
    | (UseQueryOptions & {
          organizationId: string;
          dataServiceId: DataServiceId;
          method: string;
      })
    | undefined {
    if (!service) return;

    return {
        organizationId: organization.id,
        dataServiceId: service.dataServiceId,
        method: method as string,

        staleTime: Infinity,

        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: [organization.id, service.dataServiceId, method],

        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000 + 1000));

            return (service[method] as () => FetchResponse)().json();
        },
    };
}
