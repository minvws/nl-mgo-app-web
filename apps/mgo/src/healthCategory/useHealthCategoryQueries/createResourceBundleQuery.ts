import { type HealthcareOrganization } from '$/store';
import { type DataService } from '@minvws/mgo-data-services';
import { type UseQueryOptions } from '@tanstack/react-query';
import { type HealthCategory } from '../HealthCategory';
import { type ResourceQueryMeta } from './isResourceQueryMeta';

type FetchResponse = { json: () => Promise<unknown> };
type SafeReturnType<T> = T extends (...args: any) => any ? ReturnType<T> : unknown; // eslint-disable-line @typescript-eslint/no-explicit-any
export type ServiceRequestKeys<T extends DataService> = {
    [K in keyof T]: SafeReturnType<T[K]> extends FetchResponse ? K : never;
}[keyof T];

export interface ResourceQueryConfig<T extends DataService> {
    category: HealthCategory;
    organization: HealthcareOrganization;
    service: T | null;
    method: ServiceRequestKeys<T>;
}

export function createResourceBundleQuery<T extends DataService>({
    category,
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
            fhirVersion: service.fhirVersion,
        } satisfies ResourceQueryMeta,

        // eslint-disable-next-line @tanstack/query/exhaustive-deps -- service[method] is not properly serializable, this combination of dataServiceId and method is enough
        queryKey: [category, organization.id, service.dataServiceId, method],

        queryFn: async () => {
            return (service[method] as () => FetchResponse)().json();
        },
    };
}
