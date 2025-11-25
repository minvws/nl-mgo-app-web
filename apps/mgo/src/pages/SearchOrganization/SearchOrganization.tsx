import { Breadcrumbs } from '$/components/Breadcrumbs/Breadcrumbs';
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { FormattedMessage, useIntl } from '$/intl';
import { getLoadService } from '$/services';
import { Heading, SearchForm } from '@minvws/mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DefaultContent } from './DefaultContent';
import { NoResults } from './NoResults';
import { SearchResults } from './SearchResults';

export function SearchOrganization() {
    const { formatMessage } = useIntl();

    const heading = formatMessage('add_organization.heading');
    const [searchQuery, setSearchQuery] = useState('');
    const loadService = getLoadService();

    const useMockSearch = searchQuery === 'test';

    /* c8 ignore start - this code is just for testing purposes, coverage will be added later */
    const query = useQuery({
        queryKey: ['new-search'],
        queryFn: async () =>
            loadService.search({
                name: 'test',
                city: 'test',
            }),
        enabled: useMockSearch,
        retry: 0,
    });
    /* c8 ignore end */

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

                {!searchQuery && <DefaultContent />}

                {/* c8 ignore start - this code is just for testing purposes, coverage will be added later */}
                {query.isLoading && (
                    <div className="flex grow flex-col items-center justify-center py-8">
                        <LoadingSpinner />
                    </div>
                )}

                {useMockSearch && query.isSuccess && query.data?.length && (
                    <SearchResults searchResults={query.data} className="py-8" />
                )}

                {searchQuery && !query.isLoading && (!query.data?.length || !useMockSearch) && (
                    <NoResults />
                )}
                {/* c8 ignore end */}
            </section>
        </>
    );
}
