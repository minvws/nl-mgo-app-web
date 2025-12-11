/* c8 ignore start - this is still a work in progress, will be added to coverage later */

import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { FormattedMessage, useIntl } from '$/intl';
import { Heading, SearchForm } from '@minvws/mgo-ui';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DefaultContent } from './DefaultContent';
import { NoResults } from './NoResults';
import { SearchResults } from './SearchResults';
import { useSearch } from './useSearch';

export function SearchOrganization() {
    const { formatMessage } = useIntl();
    const heading = formatMessage('add_organization.heading');
    const [searchQuery, setSearchQuery] = useState('');
    const { search, isInitializing, isSearching, searchResults } = useSearch();

    const handleQueryChange = (query: string) => {
        setSearchQuery(query);

        if (!isInitializing) {
            search(query);
        }
    };

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
                    onChange={handleQueryChange}
                />

                {/* c8 ignore start - this code is just for testing purposes, coverage will be added later */}
                {!searchQuery ? (
                    <DefaultContent />
                ) : isInitializing || isSearching ? (
                    <div className="flex grow flex-col items-center justify-center py-8">
                        <LoadingSpinner />
                    </div>
                ) : searchResults?.count ? (
                    <SearchResults searchResults={searchResults} className="py-8" />
                ) : (
                    <NoResults />
                )}

                {/* c8 ignore end */}
            </section>
        </>
    );
}
