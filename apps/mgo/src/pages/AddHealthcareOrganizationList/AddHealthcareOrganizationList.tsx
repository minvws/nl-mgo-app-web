import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks';
import { useHealthcareOrganizationsStore } from '$/store';
import { Trans, msg } from '@lingui/macro';
import { Container, Heading } from '@minvws/mgo-mgo-ui';
import { HealthcareOrganizations } from './HealthcareOrganizations';
import { NoHealthcareOrganizations } from './NoHealtcareOrganizations';
import { Helmet } from 'react-helmet-async';
import { useLingui } from '@lingui/react';

export function AddHealthcareOrganizationList() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { hasOrganizations } = useHealthcareOrganizationsStore();

    return (
        <div className="flex flex-grow flex-col">
            <Helmet
                title={_(
                    msg({
                        id: 'healthcare-organizations.title',
                        message: 'Welke zorgaanbieders wil je op je overzicht tonen?',
                    })
                )}
            />

            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md">
                <Heading asChild size="lg">
                    <h1 ref={navFocusRef}>
                        <Trans id="healthcare-organizations.heading">
                            Welke zorgaanbieders wil je op je overzicht tonen?
                        </Trans>
                    </h1>
                </Heading>
            </Container>

            <Container className="flex max-w-md flex-grow">
                {hasOrganizations() ? <HealthcareOrganizations /> : <NoHealthcareOrganizations />}
            </Container>
        </div>
    );
}
