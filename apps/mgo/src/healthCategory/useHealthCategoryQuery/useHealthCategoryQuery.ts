import { useQueries } from '@tanstack/react-query';
import { type HealthCategory } from '..';
import { useHealthCategoryQueries } from '../useHealthCategoryQueries/useHealthCategoryQueries';
import {
    type HealthCategoryData,
    useHealthCategoryData,
} from '../useHealthCategoryData/useHealthCategoryData';

type QueryResult<T extends HealthCategory> =
    | {
          isLoading: true;
          data: null;
      }
    | {
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
        data: isLoading ? null : data,
    } as QueryResult<T>;
}
