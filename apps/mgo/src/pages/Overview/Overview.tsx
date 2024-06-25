import { useNavFocusRef } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { Trans } from '@lingui/macro';
import { Heading } from '@minvws/mgo-mgo-ui';
import { Organizations } from './Organizations';
import { NoOrganizations } from './NoOrganizations';

export function Overview() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    const { organizations } = useOrganizationsStore();

    return (
        <>
            <Heading asChild size="lg" className="mb-2 md:mb-4">
                <h1 ref={navFocusRef}>
                    <Trans id="overview.heading">Goedemorgen</Trans>
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
