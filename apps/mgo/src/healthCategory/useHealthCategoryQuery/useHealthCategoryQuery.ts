import { type UseQueryOptions, useQueries } from '@tanstack/react-query';
import { type HealthCategory } from '..';
import { useHealthCategoryQueries } from '../useHealthCategoryQueries/useHealthCategoryQueries';
import {
    type HealthCategoryData,
    useHealthCategoryData,
} from '../useHealthCategoryData/useHealthCategoryData';
import { useUniqueId } from '@minvws/mgo-mgo-ui';
import { type FhirResource, isFhirResource, getBundleMgoResources } from '@minvws/mgo-fhir-data';
import { useResourcesStore } from '$/store';
import { useEffect } from 'react';
import { type DataServiceId } from '@minvws/mgo-fhir-client';

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

function isEmpty(data: HealthCategoryData) {
    return !Object.values(data).some((x) => x?.length > 0);
}

export function useHealthCategoryQuery<T extends HealthCategory>(
    category: T,
    organizationIdFilter?: (string | undefined)[]
) {
    const id = useUniqueId(`health-category-query-${category}`);
    const queries = useHealthCategoryQueries(category, organizationIdFilter);
    const queryResults = useQueries({ queries });
    const resourceStore = useResourcesStore.getState();
    const queryData = queryResults.map((query) => query.data);
    const isLoading = queryResults.some((query) => query.isLoading);
    const isError = queryResults.some((query) => query.isError);
    const data = useHealthCategoryData(category, organizationIdFilter);

    useEffect(() => {
        if (isLoading) return;

        for (let i = 0; i < queries.length; i++) {
            const query = queries[i] as UseQueryOptions & {
                organizationId: string;
                dataServiceId: DataServiceId;
                method: string;
            };
            const queryResult = queryResults[i];
            const bundle = queryResult.data;

            if (!isFhirResource(bundle, 'Bundle')) {
                throw new Error(
                    `Response does not seem to contain a Fhir Bundle. Received resourceType: "${(bundle as FhirResource)?.resourceType}"`
                );
            }

            const mgoResources = getBundleMgoResources(bundle);

            if (mgoResources?.length) {
                const mgoResourcesDtos = mgoResources.map((mgoResource) => ({
                    dataServiceId: query.dataServiceId,
                    organizationId: query.organizationId,
                    mgoResource,
                }));
                resourceStore.addResources(mgoResourcesDtos);
            }
        }
    }, [isLoading, ...queryData]);

    return {
        id,
        isLoading,
        isError,
        isEmpty: isError ? false : isEmpty(data),
        data: isLoading ? null : data,
        category,
    } as QueryResult<T>;
}
