import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks';
import { useOrganizationsStore } from '$/store';
import { Trans, msg } from '@lingui/macro';
import { Container, Heading } from '@minvws/mgo-mgo-ui';
import { Organizations } from './Organizations';
import { NoOrganizations } from './NoOrganizations';
import { Helmet } from 'react-helmet-async';
import { useLingui } from '@lingui/react';

export function OrganizationList() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { hasOrganizations } = useOrganizationsStore();

    return (
        <div className="flex flex-grow flex-col">
            <Helmet
                title={_(
                    msg({
                        id: 'organization_list.heading',
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
                        <Trans id="organization_list.heading">
                            Welke zorgaanbieders wil je op je overzicht tonen?
                        </Trans>
                    </h1>
                </Heading>
            </Container>

            <Container className="flex max-w-md flex-grow">
                {hasOrganizations() ? <Organizations /> : <NoOrganizations />}
            </Container>
        </div>
    );
}
