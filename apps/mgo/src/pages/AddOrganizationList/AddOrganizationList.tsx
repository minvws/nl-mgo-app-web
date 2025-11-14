import { BackButton } from '$/components/BackButton/BackButton';
import { FormattedMessage, useIntl } from '$/intl';
import { useStore } from '$/store';
import { Heading } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NoOrganizations } from './NoOrganizations';
import { Organizations } from './Organizations';

export function AddOrganizationList() {
    const { formatMessage } = useIntl();
    const hasOrganizations = useStore.use.hasOrganizations();

    return (
        <>
            <Helmet title={formatMessage('add_organization_list.heading')} />

            <section className="grow pb-12 md:pb-16 lg:pb-24">
                <BackButton />

                <div className="mx-auto max-w-md">
                    <Heading as="h1" focusOnRender size="xl">
                        <FormattedMessage
                            id="add_organization_list.heading"
                            description="Welke zorgaanbieders wil je in je overzicht tonen?"
                        />
                    </Heading>

                    {hasOrganizations() ? <Organizations /> : <NoOrganizations />}
                </div>
            </section>
        </>
    );
}
