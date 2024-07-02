import { useNavFocusRef } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { Heading } from '@minvws/mgo-mgo-ui';
import { FormattedMessage } from 'react-intl';
import { NoOrganizations } from './NoOrganizations';
import { Organizations } from './Organizations';

export function Overview() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    const { organizations } = useOrganizationsStore();

    return (
        <>
            <Heading asChild size="lg" className="mb-2 md:mb-4">
                <h1 ref={navFocusRef}>
                    <FormattedMessage id="overview.heading" description="Goedemorgen" />
                </h1>
            </Heading>

            {organizations.length ? (
                <Organizations organizations={organizations} />
            ) : (
                <NoOrganizations />
            )}
        </>
    );
}
