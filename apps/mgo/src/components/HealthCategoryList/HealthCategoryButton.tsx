import { healthCategorySlugs, type HealthCategory } from '$/healthCategory';
import { type QueryResult } from '$/healthCategory/useHealthCategoryQuery/useHealthCategoryQuery';
import { RouterLink } from '$/routing';
import { CategoryButton } from '@minvws/mgo-mgo-ui';
import { FormattedMessage, useIntl } from 'react-intl';

export interface HealthCategoryButtonProps<T extends HealthCategory> {
    readonly query: QueryResult<T>;
}

export function HealthCategoryButton<T extends HealthCategory>({
    query,
}: HealthCategoryButtonProps<T>) {
    const intl = useIntl();

    if (!query.isLoading && query.isEmpty) {
        return (
            <CategoryButton isDisabled label={intl.formatMessage({ id: 'common.no-results' })}>
                <FormattedMessage id={`${query.category}_heading`} />
            </CategoryButton>
        );
    }

    return (
        <CategoryButton
            asChild
            loadingText={intl.formatMessage({ id: 'common.loading' })}
            isLoading={query.isLoading}
        >
            <RouterLink to={`./${healthCategorySlugs[query.category]}`}>
                <FormattedMessage id={`${query.category}_heading`} />
            </RouterLink>
        </CategoryButton>
    );
}
