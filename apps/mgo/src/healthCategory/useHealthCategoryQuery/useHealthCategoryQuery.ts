import { useResourcesStore } from '$/store';
import { getBundleMgoResources, isFhirResource, type FhirResource } from '@minvws/mgo-fhir-data';
import { useUniqueId } from '@minvws/mgo-mgo-ui';
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
} from '../useHealthCategoryQueries/resourceQueryMeta';
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
    category: T,
    organizationIdFilter?: (string | undefined)[]
) {
    const addResources = useResourcesStore((x) => x.addResources);
    const queries = useHealthCategoryQueries(category, organizationIdFilter);

    const { data, meta, isLoading, isError } = useQueries({
        queries,
        combine: (results) => {
            return {
                meta: queries.map((result) => {
                    if (!isResourceQueryMeta(result.meta)) {
                        throw new Error('meta data needs to be of type ResourceQueryMeta');
                    }
                    return result.meta as ResourceQueryMeta;
                }),
                data: results.map((result) => result.data),
                isLoading: results.some((result) => result.isLoading),
                isError: results.some((result) => result.isError),
            };
        },
    });

    const categoryData = useHealthCategoryData(category, organizationIdFilter);

    useEffect(() => {
        if (isLoading) return;

        for (let i = 0; i < data.length; i++) {
            const { dataServiceId, method, organizationId } = meta[i];
            const responseData = data[i];

            if (!responseData) continue;

            if (!isFhirResource(responseData, 'Bundle')) {
                throw new Error(
                    `Response for service: ${dataServiceId}: ${method} - does not seem to contain a Fhir Bundle.` +
                        `Received resourceType: "${(responseData as FhirResource)?.resourceType}"`
                );
            }

            const mgoResources = getBundleMgoResources(responseData);

            if (mgoResources?.length) {
                addResources(
                    mgoResources.map((mgoResource) => ({
                        dataServiceId,
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
        isEmpty: isError ? false : isEmpty(categoryData),
        data: isLoading ? null : categoryData,
    } as QueryResult<T>;
}
