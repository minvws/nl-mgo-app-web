import { HealthCategoryList } from '$/components/HealthCategoryList/HealthCategoryList';
import { NoOrganizations } from '$/components/NoOrganizations/NoOrganizations';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage } from '$/intl';
import { store } from '$/store';
import { Heading } from '@minvws/mgo-ui';

export function Overview() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const organizations = store.use.organizations();

    return (
        <>
            <Heading asChild size="lg" className="mb-4 md:mb-8">
                <h1 ref={navFocusRef}>
                    <FormattedMessage id="overview.heading" />
                </h1>
            </Heading>

            {organizations.length ? <HealthCategoryList /> : <NoOrganizations />}
        </>
    );
}
