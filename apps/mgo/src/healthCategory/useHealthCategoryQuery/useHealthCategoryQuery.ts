import { useQueries } from '@tanstack/react-query';
import { type HealthCategory } from '..';
import { useHealthCategoryQueries } from '../useHealthCategoryQueries/useHealthCategoryQueries';
import {
    type HealthCategoryData,
    useHealthCategoryData,
} from '../useHealthCategoryData/useHealthCategoryData';
import { useUniqueId } from '@minvws/mgo-mgo-ui';

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
    console.log('useHealthCategoryQuery id:', id);
    const queryResults = useQueries({ queries });
    const isLoading = queryResults.some((query) => query.isLoading);
    const isError = queryResults.some((query) => query.isError);
    const data = useHealthCategoryData(category, organizationIdFilter);

    return {
        id,
        isLoading,
        isError,
        isEmpty: isError ? false : isEmpty(data),
        data: isLoading ? null : data,
        category,
    } as QueryResult<T>;
}
