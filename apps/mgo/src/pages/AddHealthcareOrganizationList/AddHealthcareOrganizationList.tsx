import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks';
import { useHealthcareOrganizationsStore } from '$/store';
import { Trans } from '@lingui/macro';
import { Container, Heading } from '@minvws/mgo-mgo-ui';
import { HealthcareOrganizations } from './HealthcareOrganizations';
import { NoHealthcareOrganizations } from './NoHealtcareOrganizations';

export function AddHealthcareOrganizationList() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { hasHealthcareOrganizations } = useHealthcareOrganizationsStore();

    return (
        <div className="flex flex-grow flex-col">
            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md">
                <Heading asChild size="lg">
                    <h1 ref={navFocusRef}>
                        <Trans id="healthcare-providers.heading">
                            Welke zorgaanbieders wil je op je overzicht tonen?
                        </Trans>
                    </h1>
                </Heading>
            </Container>

            <Container className="flex max-w-md flex-grow">
                {hasHealthcareOrganizations() ? (
                    <HealthcareOrganizations />
                ) : (
                    <NoHealthcareOrganizations />
                )}
            </Container>
        </div>
    );
}
