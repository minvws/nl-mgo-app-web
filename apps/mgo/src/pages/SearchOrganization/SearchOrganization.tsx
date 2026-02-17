/* v8 ignore start - this is still a work in progress, will be added to coverage later */

import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { useIntl } from '$/intl';
import { Heading, SearchForm } from '@minvws/mgo-ui';
import { useEffect, useRef, useState } from 'react';
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
    const prevIsInitializing = useRef(isInitializing);

    const handleQueryChange = (query: string) => {
        setSearchQuery(query);

        if (!isInitializing) {
            search(query);
        }
    };

    useEffect(() => {
        const justFinishedInitializing = prevIsInitializing.current && !isInitializing;

        if (justFinishedInitializing && searchQuery) {
            search(searchQuery);
        }

        prevIsInitializing.current = isInitializing;
    }, [isInitializing, searchQuery, search]);

    return (
        <>
            <Helmet title={heading} />

            <section className="flex grow flex-col">
                <Breadcrumbs className="mb-4 md:mb-6" />

                <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-6">
                    {heading}
                </Heading>

                <SearchForm
                    ariaLabel={formatMessage('add_organization.search_aria_label')}
                    clearAriaLabel={formatMessage('add_organization.search_clear')}
                    placeholder={formatMessage('add_organization.search_placeholder')}
                    value={searchQuery}
                    onChange={handleQueryChange}
                    loading={isSearching}
                />

                {/* v8 ignore start - this code is just for testing purposes, coverage will be added later */}
                {isInitializing || isSearching ? (
                    <div className="flex grow flex-col items-center justify-center py-8">
                        <LoadingSpinner />
                    </div>
                ) : !searchQuery ? (
                    <DefaultContent />
                ) : searchResults?.count ? (
                    <SearchResults searchResults={searchResults} className="py-8" />
                ) : (
                    <NoResults />
                )}

                {/* v8 ignore end */}
            </section>
        </>
    );
}
