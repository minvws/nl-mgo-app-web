import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { getLoadService } from '$/services';
import { Container, Heading } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BackButton } from '../../components/BackButton/BackButton';
import { NoSearchResultsTips } from './NoSearchResultsTips';
import { SearchForm, type SearchFormData } from './SearchForm';
import { SearchResults } from './SearchResults';

export function AddOrganization() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const [searchQuery, setSearchQuery] = useState<SearchFormData>();
    const loadService = getLoadService();

    const query = useQuery({
        queryKey: ['search', searchQuery],
        queryFn: async () => loadService.search(searchQuery!),
        enabled: !!searchQuery,
        retry: 0,
    });

    return (
        <div className="flex flex-grow flex-col">
            <Helmet title={formatMessage('add_organization.heading')} />

            <Container>
                <BackButton />
            </Container>

            <Container className="mb-4 max-w-md">
                <Heading asChild size="lg" className="mb-4 md:mb-6">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage
                            id="add_organization.heading"
                            description="Voeg een zorgaanbieder toe"
                        />
                    </h1>
                </Heading>

                <SearchForm onSubmit={setSearchQuery} />
            </Container>

            <Container className="flex max-w-md flex-grow pb-12 md:pb-16 lg:pb-24">
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
                            title={formatMessage('organization_search.no_results_found_heading')}
                        >
                            <NoSearchResultsTips />
                        </QueryState.NoResult>
                    }
                    renderResult={({ data }) => (
                        <SearchResults searchResults={data} className="py-6" />
                    )}
                />
            </Container>
        </div>
    );
}
