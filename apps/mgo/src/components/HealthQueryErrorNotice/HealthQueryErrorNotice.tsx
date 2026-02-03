import { useFailedAndPausedHealthQueries } from '$/hooks';
import { useIntl } from '$/intl';
import { HealthcareOrganization } from '$/store';
import { HealthCategoryConfig } from '@minvws/mgo-config';
import { ErrorNotice } from '@minvws/mgo-ui';
import { onlineManager } from '@tanstack/react-query';

export interface HealthQueryErrorNoticeProps {
    readonly organizationsFilter?: HealthcareOrganization[];
    readonly categoriesFilter?: HealthCategoryConfig[];
}

export function HealthQueryErrorNotice({
    organizationsFilter,
    categoriesFilter,
}: HealthQueryErrorNoticeProps) {
    const failedAndPausedQueries = useFailedAndPausedHealthQueries({
        organizationsFilter,
        categoriesFilter,
    });

    const { formatMessage } = useIntl();

    return (
        <ErrorNotice
            isOpen={failedAndPausedQueries.hasFailedQueries || failedAndPausedQueries.isRetrying}
            heading={formatMessage('common.data_not_retrieved_heading')}
            subHeading={
                onlineManager.isOnline()
                    ? formatMessage('common.data_not_retrieved_subheading')
                    : formatMessage('errorstate.clientside.heading')
            }
            buttonLabel={formatMessage('common.try_again')}
            onClick={() => failedAndPausedQueries.retry()}
            loading={failedAndPausedQueries.isRetrying}
            loadingTextScreenReader={formatMessage('common.loading_data')}
        />
    );
}
