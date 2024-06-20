import { useNavFocusRef } from '$/hooks';
import { useHealthcareOrganizationsStore } from '$/store';
import { Trans } from '@lingui/macro';
import { Heading } from '@minvws/mgo-mgo-ui';
import { HealthcareOrganizations } from './HealthcareOrganizations';
import { NoHealthcareOrganizations } from './NoHealthcareOrganizations';

export function Overview() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    const { organizations } = useHealthcareOrganizationsStore();

    return (
        <>
            <Heading asChild size="lg" className="mb-2 md:mb-4">
                <h1 ref={navFocusRef}>
                    <Trans id="overview.heading">Goedemorgen, Wendy</Trans>
                </h1>
            </Heading>
            {organizations.length ? (
                <HealthcareOrganizations organizations={organizations} />
            ) : (
                <NoHealthcareOrganizations />
            )}
        </>
    );
}
