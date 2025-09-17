import { HealthCategoryConfig } from '$/config';
import { useHealthCategorySlug } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { AppMessagesIds } from '@minvws/mgo-intl';
import { CategoryButton, type CategoryButtonIcon } from '@minvws/mgo-ui';

export interface HealthCategoryButtonProps {
    readonly category: HealthCategoryConfig;
    readonly isLoading?: boolean;
    readonly isEmpty?: boolean;
}

export function HealthCategoryButton({ category, isLoading, isEmpty }: HealthCategoryButtonProps) {
    const { formatMessage } = useIntl();
    const slug = useHealthCategorySlug(category);

    return (
        <CategoryButton
            asChild
            icon={category.icon as CategoryButtonIcon}
            loadingText={formatMessage('common.loading')}
            isLoading={isLoading}
            label={!isLoading && isEmpty ? formatMessage('common.no_data') : undefined}
        >
            <RouterLink to={`./${slug}`}>
                <FormattedMessage id={category.heading as AppMessagesIds} />
            </RouterLink>
        </CategoryButton>
    );
}
