import { QueryState } from '$/components/QueryState/QueryState';
import { FormattedMessage, useIntl } from '$/intl';
import { getLoadService } from '$/services';
import { Heading } from '@minvws/mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BackButton } from '../../components/BackButton/BackButton';
import { NoSearchResultsTips } from './NoSearchResultsTips';
import { SearchForm, type SearchFormData } from './SearchForm';
import { SearchResults } from './SearchResults';

export function AddOrganization() {
    const { formatMessage } = useIntl();
    const [searchQuery, setSearchQuery] = useState<SearchFormData>();
    const loadService = getLoadService();

    const query = useQuery({
        queryKey: ['search', searchQuery],
        queryFn: async () => loadService.search(searchQuery!),
        enabled: !!searchQuery,
        retry: 0,
    });

    return (
        <>
            <Helmet title={formatMessage('add_organization.heading')} />
            <section className="grow pb-12 md:pb-16 lg:pb-24">
                <BackButton />

                <div className="mx-auto max-w-md">
                    <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-6">
                        <FormattedMessage
                            id="add_organization.heading"
                            description="Voeg een zorgaanbieder toe"
                        />
                    </Heading>

                    <SearchForm onSubmit={setSearchQuery} className="mb-4" />

                    <QueryState
                        {...query}
                        useFetchStatus
                        renderLoading={
                            <QueryState.Loading>
                                <FormattedMessage
                                    id="organization_search.searching"
                                    description="Zorgaanbieders aan het zoeken..."
                                />
                            </QueryState.Loading>
                        }
                        renderNoResult={
                            <QueryState.NoResult
                                illustration="woman-on-couch-exclamation"
                                title={formatMessage(
                                    'organization_search.no_results_found_heading'
                                )}
                            >
                                <NoSearchResultsTips />
                            </QueryState.NoResult>
                        }
                        renderResult={({ data }) => (
                            <SearchResults searchResults={data} className="py-6" />
                        )}
                    />
                </div>
            </section>
        </>
    );
}
