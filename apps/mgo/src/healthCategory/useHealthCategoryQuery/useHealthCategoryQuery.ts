import { useResourcesStore } from '$/store';
import { isFhirResource, type FhirResource } from '@minvws/mgo-fhir';
import { getBundleResources, getMgoResource } from '@minvws/mgo-hcim';
import { useUniqueId } from '@minvws/mgo-ui';
import { isNonNullish } from '@minvws/mgo-utils';
import { useQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { type HealthCategory } from '..';
import {
    useHealthCategoryData,
    type HealthCategoryData,
} from '../useHealthCategoryData/useHealthCategoryData';
import {
    isResourceQueryMeta,
    type ResourceQueryMeta,
} from '../useHealthCategoryQueries/isResourceQueryMeta';
import { useHealthCategoryQueries } from '../useHealthCategoryQueries/useHealthCategoryQueries';
import { isEmpty } from './isEmpty';

export type QueryResult<T extends HealthCategory> = {
    id: string;
    category: T;
    isError: boolean;
    isEmpty: boolean;
} & (
    | {
          isLoading: true;
          data: null;
      }
    | {
          isLoading: false;
          data: HealthCategoryData<T>;
      }
);

export function useHealthCategoryQuery<T extends HealthCategory>(
    category: T | undefined,
    organizationIdFilter?: (string | undefined)[]
) {
    const addResources = useResourcesStore((x) => x.addResources);
    const queries = useHealthCategoryQueries(category, organizationIdFilter);
    const categoryData = useHealthCategoryData(category, organizationIdFilter);

    const { data, meta, isLoading, isError } = useQueries({
        queries,
        combine: (results) => {
            return {
                meta: queries.map((query) => {
                    /* c8 ignore start - I dont seem to be able to catch the error with @testing-library/react :( ) */
                    if (!isResourceQueryMeta(query.meta)) {
                        throw new Error('meta data needs to be of type ResourceQueryMeta');
                    }
                    /* c8 ignore end */
                    return query.meta as ResourceQueryMeta;
                }),
                data: results.map((result) => result.data),
                isLoading: results.some((result) => result.isLoading),
                isError: results.some((result) => result.isError),
            };
        },
    });

    useEffect(() => {
        if (isLoading) return;

        for (let i = 0; i < data.length; i++) {
            const { dataServiceId, method, organizationId, fhirVersion } = meta[i];
            const responseData = data[i];

            // data can be undefined if the request failed
            if (!responseData) continue;

            /* c8 ignore start - I dont seem to be able to catch the error with @testing-library/react :( ) */
            if (!isFhirResource(responseData, 'Bundle')) {
                throw new Error(
                    `Response for service: ${dataServiceId}: ${method} - does not seem to contain a Fhir Bundle.` +
                        `Received resourceType: "${(responseData as FhirResource)?.resourceType}"`
                );
            }
            /* c8 ignore end */

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const fhirResources = getBundleResources(responseData as any);
            const mgoResources = fhirResources
                .map((x) => getMgoResource(x, { fhirVersion }))
                .filter(isNonNullish);

            if (mgoResources?.length) {
                addResources(
                    mgoResources.map((mgoResource) => ({
                        dataServiceId,
                        dataServiceMethod: method,
                        organizationId,
                        mgoResource,
                    }))
                );
            }
        }
    }, [isLoading, data, meta, addResources]);

    return {
        id: useUniqueId(`health-category-query-${category}`),
        category,
        isLoading,
        isError,
        isEmpty: isLoading ? false : isEmpty(categoryData),
        data: isLoading ? null : categoryData,
    } as QueryResult<T>;
}
