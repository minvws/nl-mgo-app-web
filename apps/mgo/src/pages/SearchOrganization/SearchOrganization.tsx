import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { FormattedMessage, useIntl } from '$/intl';
import { Heading, SearchForm } from '@minvws/mgo-ui';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DefaultContent } from './DefaultContent';

export function SearchOrganization() {
    const { formatMessage } = useIntl();

    const heading = formatMessage('add_organization.heading');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <Helmet title={heading} />

            <section className="flex grow flex-col">
                <Breadcrumbs />

                <Heading as="h1" focusOnRender size="xl" className="mt-3 mb-4 md:mt-4 md:mb-6">
                    <FormattedMessage
                        id="add_organization.heading"
                        description="Voeg een zorgaanbieder toe"
                    />
                </Heading>

                <SearchForm
                    clearAriaLabel={formatMessage('add_organization.search_clear')}
                    placeholder={formatMessage('add_organization.search_placeholder')}
                    value={searchQuery}
                    onChange={setSearchQuery}
                />

                <DefaultContent />
            </section>
        </>
    );
}
