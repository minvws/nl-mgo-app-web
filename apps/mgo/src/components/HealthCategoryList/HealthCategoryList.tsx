import { getHealthCategoryConfigs } from '$/config';
import { useHealthCategoriesQuery } from '$/hooks';
import { useStore, type HealthcareOrganization } from '$/store';
import { ListWrapper, Stack } from '@minvws/mgo-ui';
import { HealthCategoryButton } from './HealthCategoryButton';

export interface CategoryListProps {
    readonly organization?: HealthcareOrganization;
}

export function HealthCategoryList({ organization }: CategoryListProps) {
    const allOrganizations = useStore.use.organizations();
    const organizations = organization ? [organization] : allOrganizations;

    const categoryQueries = useHealthCategoriesQuery({
        categories: getHealthCategoryConfigs(),
        organizations,
    });

    const completed = categoryQueries
        .filter((query) => !query.isLoading && !query.isEmpty)
        .map((query) => <HealthCategoryButton key={query.category.id} category={query.category} />);

    const loading = categoryQueries
        .filter((query) => query.isLoading)
        .map((query) => (
            <HealthCategoryButton key={query.category.id} category={query.category} isLoading />
        ));

    const empty = categoryQueries
        .filter((query) => !query.isLoading && query.isEmpty)
        .map((query) => (
            <HealthCategoryButton key={query.category.id} category={query.category} isEmpty />
        ));

    return (
        <Stack className="gap-6">
            <ListWrapper gap="line">{completed}</ListWrapper>
            <ListWrapper gap="line">{loading}</ListWrapper>
            <ListWrapper gap="line">{empty}</ListWrapper>
        </Stack>
    );
}
