import { HealthCategoryList } from '$/components/HealthCategoryList/HealthCategoryList';
import { useNavFocusRef } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { Heading } from '@minvws/mgo-mgo-ui';
import { FormattedMessage } from 'react-intl';
import { NoOrganizations } from '$/components/NoOrganizations/NoOrganizations';

export function Overview() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    const { organizations } = useOrganizationsStore();

    return (
        <>
            <Heading asChild size="lg" className="mb-4 md:mb-8">
                <h1 ref={navFocusRef}>
                    <FormattedMessage id="overview.heading" description="Goedemorgen" />
                </h1>
            </Heading>

            {organizations.length ? <HealthCategoryList /> : <NoOrganizations />}
        </>
    );
}
