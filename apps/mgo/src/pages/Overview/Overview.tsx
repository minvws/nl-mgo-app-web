import { HealthCategoryGrid } from '$/components/HealthCategoryGrid/HealthCategoryGrid';
import { NoOrganizations } from '$/components/NoOrganizations/NoOrganizations';
import { FormattedMessage, useIntl } from '$/intl';
import { usePft } from '$/pft/usePft';
import { useStore } from '$/store';
import { ErrorNotice, Heading, Text } from '@minvws/mgo-ui';

export function Overview() {
    const organizations = useStore.use.organizations();
    const { formatMessage } = useIntl();

    // preload the patient friendly terms information
    usePft();

    return (
        <>
            <ErrorNotice
                state="error"
                heading={formatMessage('common.data_not_retrieved_heading')}
                subHeading={formatMessage('common.data_not_retrieved_subheading')}
                buttonLabel={formatMessage('common.try_again')}
            />
            <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-8">
                <FormattedMessage id="overview.heading" />
            </Heading>

            <Text as="p" size="lg">
                <FormattedMessage id="overview.subheading" />
            </Text>

            {organizations.length ? (
                <HealthCategoryGrid organizations={organizations} />
            ) : (
                <NoOrganizations />
            )}
        </>
    );
}
