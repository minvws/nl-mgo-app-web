import { useFailedHealthQueries, useRetryQuery } from '$/hooks';
import { useIntl } from '$/intl';
import { HealthcareOrganization } from '$/store';
import { HealthCategoryConfig } from '@minvws/mgo-config';
import { ErrorNotice } from '@minvws/mgo-ui';
import { onlineManager } from '@tanstack/react-query';

export interface HealthQueryErrorNoticeProps {
    readonly organizationsFilter?: HealthcareOrganization[];
    readonly healthCategoriesFilter?: HealthCategoryConfig[];
}

export function HealthQueryErrorNotice({
    organizationsFilter: organizations,
    healthCategoriesFilter: healthCategories,
}: HealthQueryErrorNoticeProps) {
    const failedQueries = useFailedHealthQueries({
        organizationsFilter: organizations,
        categoriesFilter: healthCategories,
    });
    const { retry, isRetrying } = useRetryQuery();

    const { formatMessage } = useIntl();

    return (
        <ErrorNotice
            isOpen={failedQueries.length > 0 || isRetrying}
            heading={formatMessage('common.data_not_retrieved_heading')}
            subHeading={
                onlineManager.isOnline()
                    ? formatMessage('common.data_not_retrieved_subheading')
                    : formatMessage('errorstate.clientside.heading')
            }
            buttonLabel={formatMessage('common.try_again')}
            onClick={() => retry(failedQueries)}
            loading={isRetrying}
            loadingTextScreenReader={formatMessage('common.loading_data')}
        />
    );
}
