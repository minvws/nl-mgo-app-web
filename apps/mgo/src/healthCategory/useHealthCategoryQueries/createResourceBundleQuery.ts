import { type HealthcareOrganization } from '$/store';
import { type DataService } from '@minvws/mgo-fhir-client';
import { type UseQueryOptions } from '@tanstack/react-query';
import { type ResourceQueryMeta } from './resourceQueryMeta';

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
        retry: false,
        staleTime: Infinity,

        meta: {
            organizationId: organization.id,
            dataServiceId: service.dataServiceId,
            method: method as string,
        } satisfies ResourceQueryMeta,

        // eslint-disable-next-line @tanstack/query/exhaustive-deps -- service[method] is not properly serializable, this combination of dataServiceId and method is enough
        queryKey: [organization.id, service.dataServiceId, method],

        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000 + 1000));
            return (service[method] as () => FetchResponse)().json();
        },
    };
}
