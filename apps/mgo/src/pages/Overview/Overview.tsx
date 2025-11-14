import { HealthCategoryList } from '$/components/HealthCategoryList/HealthCategoryList';
import { NoOrganizations } from '$/components/NoOrganizations/NoOrganizations';
import { FormattedMessage } from '$/intl';
import { usePft } from '$/pft/usePft';
import { useStore } from '$/store';
import { Heading } from '@minvws/mgo-ui';

export function Overview() {
    const organizations = useStore.use.organizations();

    // preload the patient friendly terms information
    usePft();

    return (
        <>
            <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-8">
                <FormattedMessage id="overview.heading" />
            </Heading>

            {organizations.length ? <HealthCategoryList /> : <NoOrganizations />}
        </>
    );
}
