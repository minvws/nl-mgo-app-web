import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { useOrganizationsStore } from '$/store';
import { Container, Heading } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NoOrganizations } from './NoOrganizations';
import { Organizations } from './Organizations';

export function AddOrganizationList() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { hasOrganizations } = useOrganizationsStore();

    return (
        <div className="flex flex-grow flex-col">
            <Helmet title={formatMessage('add_organization_list.heading')} />

            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md">
                <Heading asChild size="lg">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage
                            id="add_organization_list.heading"
                            description="Welke zorgaanbieders wil je in je overzicht tonen?"
                        />
                    </h1>
                </Heading>
            </Container>

            <Container className="flex max-w-md flex-grow">
                {hasOrganizations() ? <Organizations /> : <NoOrganizations />}
            </Container>
        </div>
    );
}
