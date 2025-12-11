/* c8 ignore start - this is only a POC */
import { LoadingSpinner } from '$/components/LoadingSpinner/LoadingSpinner';
import { FormattedMessage, useIntl } from '$/intl';
import { Heading, SearchForm } from '@minvws/mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NoResults } from './NoResults';
import { SearchResults } from './SearchResults';
import { SearchEngine, useSearch } from './useSearch/useSearch';

function formatTime(milliseconds?: number) {
    if (!milliseconds) return 'N/A';
    return `${milliseconds.toFixed(2)}ms`;
}

export function SearchPoc() {
    const { formatMessage } = useIntl();

    const heading = formatMessage('add_organization.heading');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTimes, setSearchTimes] = useState<number[]>([]);

    const params = new URLSearchParams(window.location.search);
    const fileParam = params.get('file') ?? 'original';
    const engineParam = params.get('engine');

    const {
        loading: loadingIndex,
        search,
        data: indexedData,
        metaData,
    } = useSearch({ file: fileParam, engine: engineParam as SearchEngine });

    const { data: searchResults, isLoading: isSearching } = useQuery({
        queryKey: ['search-org', searchQuery],
        queryFn: async () => {
            const start = performance.now();
            const results = await search({ query: searchQuery });
            setSearchTimes((prev) => [...prev, performance.now() - start]);
            return results;
        },
        enabled: !loadingIndex && !!searchQuery,
        retry: 0,
    });

    const lastSearchTime = searchTimes[searchTimes.length - 1];
    const averageSearchTime = searchTimes.reduce((acc, time) => acc + time, 0) / searchTimes.length;

    return (
        <>
            <Helmet title={heading} />

            <section className="flex grow flex-col">
                <div>
                    <pre className="text-[12px]">
                        file: {metaData.file}
                        <br />
                        engine: {metaData.engine}
                        <br />
                        loadingTime: {formatTime(metaData.loadingTime)}
                        <br />
                        indexingTime: {formatTime(metaData.indexingTime)}
                        <br />
                        query: "{searchQuery}"
                        <br />
                        searchTime: {formatTime(lastSearchTime)}
                        <br />
                        avarage searchTime: {formatTime(averageSearchTime)}
                        <br />
                        total searches: {searchTimes.length}
                        <br />
                        results: {searchResults?.length}
                        <br />
                    </pre>
                </div>

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

                {loadingIndex && (
                    <div className="flex grow flex-col items-center justify-center py-8">
                        <LoadingSpinner>Loading index...</LoadingSpinner>
                    </div>
                )}

                {searchResults?.length && (
                    <SearchResults
                        className="mt-8 mb-12"
                        searchResults={searchResults}
                        indexedData={indexedData}
                    />
                )}

                {searchQuery && !isSearching && !searchResults?.length && <NoResults />}
            </section>
        </>
    );
}
