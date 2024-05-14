import { search } from '$/api/location';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef } from '$/hooks';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Container, Heading } from '@minvws/mgo-react-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { NoSearchResultsTips } from './NoSearchResultsTips';
import { SearchForm, type SearchFormData } from './SearchForm';
import { SearchResults } from './SearchResults';

export function AddHealthcareOrganization() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const [searchQuery, setSearchQuery] = useState<SearchFormData>();

    const query = useQuery({
        queryKey: ['search', searchQuery],
        queryFn: async () => {
            const searchResults = await search(searchQuery!);
            return searchResults.organizations;
        },
        enabled: !!searchQuery,
        retry: 0,
    });

    return (
        <div className="flex flex-grow flex-col">
            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md">
                <Heading asChild size="lg" className="mb-6">
                    <h1 ref={navFocusRef}>
                        <Trans id="add-healthcare-provider.heading">
                            Voeg een zorgverlener toe
                        </Trans>
                    </h1>
                </Heading>
                <SearchForm onSubmit={setSearchQuery} />
            </Container>

            <Container className="flex max-w-md flex-grow py-4">
                <QueryState
                    {...query}
                    useFetchStatus
                    renderLoading={
                        <QueryState.Loading>Zorgverleners aan het zoeken...</QueryState.Loading>
                    }
                    renderNoResult={
                        <QueryState.NoResult
                            title={_(
                                msg({
                                    id: 'add-healthcare-provider.no-results.title',
                                    message: `Geen zorgaanbieders gevonden`,
                                })
                            )}
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
