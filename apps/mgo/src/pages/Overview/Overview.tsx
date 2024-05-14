import { useNavFocusRef } from '$/hooks';
import { useAuth } from '$/lib/auth';
import { useHealthcareOrganizationsStore } from '$/store';
import { Trans } from '@lingui/macro';
import { Heading } from '@minvws/mgo-mgo-ui';
import { HealthcareOrganizations } from './HealthcareOrganizations';
import { NoHealthcareOrganizations } from './NoHealthcareOrganizations';

export function Overview() {
    const auth = useAuth();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    const { healthcareOrganizations } = useHealthcareOrganizationsStore();

    return (
        <>
            <Heading asChild size="lg" className="mb-2 sm:mb-4 md:mb-6">
                <h1 ref={navFocusRef}>
                    <Trans id="overview.heading">Goedemorgen, Wendy</Trans>
                </h1>
            </Heading>
            {healthcareOrganizations.length ? (
                <HealthcareOrganizations organizations={healthcareOrganizations} />
            ) : (
                <NoHealthcareOrganizations />
            )}

            <button
                onClick={() => void auth.removeUser()}
                className="mb-8 self-start text-lg font-bold"
            >
                <Trans id="common.logout">Uitloggen</Trans>
            </button>
        </>
    );
}
