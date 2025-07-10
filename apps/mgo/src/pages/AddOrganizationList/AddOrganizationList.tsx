import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { useOrganizationsStore } from '$/store';
import { Heading } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NoOrganizations } from './NoOrganizations';
import { Organizations } from './Organizations';

export function AddOrganizationList() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { hasOrganizations } = useOrganizationsStore();

    return (
        <>
            <Helmet title={formatMessage('add_organization_list.heading')} />

            <section className="flex-grow pb-12 md:pb-16 lg:pb-24">
                <BackButton />

                <div className="mx-auto max-w-md">
                    <Heading asChild size="lg">
                        <h1 ref={navFocusRef}>
                            <FormattedMessage
                                id="add_organization_list.heading"
                                description="Welke zorgaanbieders wil je in je overzicht tonen?"
                            />
                        </h1>
                    </Heading>

                    {hasOrganizations() ? <Organizations /> : <NoOrganizations />}
                </div>
            </section>
        </>
    );
}
