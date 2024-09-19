import { useQueries } from '@tanstack/react-query';
import { type HealthCategory } from '..';
import { useHealthCategoryQueries } from '../useHealthCategoryQueries/useHealthCategoryQueries';
import {
    type HealthCategoryData,
    useHealthCategoryData,
} from '../useHealthCategoryData/useHealthCategoryData';

export type QueryResult<T extends HealthCategory> =
    | {
          category: T;
          isLoading: true;
          data: null;
      }
    | {
          category: T;
          isLoading: false;
          data: HealthCategoryData<T>;
      };

export function useHealthCategoryQuery<T extends HealthCategory>(
    category: T,
    organizationIdFilter?: (string | undefined)[]
) {
    const queries = useHealthCategoryQueries(category, organizationIdFilter);
    const queryResults = useQueries({ queries });
    const isLoading = queryResults.some((query) => query.isLoading);
    const data = useHealthCategoryData(category, organizationIdFilter);

    return {
        isLoading,
        category,
        data: isLoading ? null : data,
    } as QueryResult<T>;
}
