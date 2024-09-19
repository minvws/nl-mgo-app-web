import { HealthCategory, healthCategorySlugs, useHealthCategoryQuery } from '$/healthCategory';
import { type QueryResult } from '$/healthCategory/useHealthCategoryQuery/useHealthCategoryQuery';
import { RouterLink } from '$/routing';
import { type To } from '$/routing/routes';
import { type HealthcareOrganization } from '$/store';
import { CategoryButton, ListWrapper, Stack } from '@minvws/mgo-mgo-ui';
import { FormattedMessage } from 'react-intl';

export interface CategoryListProps {
    readonly organization?: HealthcareOrganization;
}
    
export function CategoryList({ organization }: CategoryListProps) {
    const categories: Record<HealthCategory, QueryResult<HealthCategory>> = {
        [HealthCategory.PersonalInformation]: useHealthCategoryQuery(HealthCategory.PersonalInformation, [organization?.id]),
        [HealthCategory.Payer]: useHealthCategoryQuery(HealthCategory.Payer, [organization?.id]),
        [HealthCategory.TreatmentPlan]: useHealthCategoryQuery(HealthCategory.TreatmentPlan, [organization?.id]),
    };

    function getUrl(category: HealthCategory): To {
        if (organization) return `/overzicht/${organization.slug}/${healthCategorySlugs[category]}`;

        return `/overzicht/${healthCategorySlugs[category]}`;
    }

    return (
        <>
            <Stack className="gap-6">
                <ListWrapper gap="line">
                    {Object.entries(categories).map(([key, query]) => {
                        return (
                            <CategoryButton
                                key={key}
                                asChild
                                loadingText="Laden"
                                isLoading={query.isLoading}
                            >
                                <RouterLink to={getUrl(query.category)}>
                                    <FormattedMessage id={`organization.${query.category}_heading`} />
                                </RouterLink>
                            </CategoryButton>
                        );
                    })}
                </ListWrapper>
            </Stack>
        </>
    );
}
