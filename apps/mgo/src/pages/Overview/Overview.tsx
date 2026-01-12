import { HealthCategoryGrid } from '$/components/HealthCategoryGrid/HealthCategoryGrid';
import { HealthQueryErrorNotice } from '$/components/HealthQueryErrorNotice/HealthQueryErrorNotice';
import { NoOrganizations } from '$/components/NoOrganizations/NoOrganizations';
import { FormattedMessage } from '$/intl';
import { usePft } from '$/pft/usePft';
import { useStore } from '$/store';
import { Heading, Text } from '@minvws/mgo-ui';

export function Overview() {
    const organizations = useStore.use.organizations();

    usePft(); // preload the patient friendly terms information

    return (
        <>
            <HealthQueryErrorNotice />
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
