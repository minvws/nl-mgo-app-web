import { search } from '$/api/load';
import { QueryState } from '$/components/QueryState/QueryState';
import { useNavFocusRef, useParseHealthcareOrganization } from '$/hooks';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Container, Heading } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BackButton } from '../../components/BackButton/BackButton';
import { NoSearchResultsTips } from './NoSearchResultsTips';
import { SearchForm, type SearchFormData } from './SearchForm';
import { SearchResults } from './SearchResults';

export function AddOrganization() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const [searchQuery, setSearchQuery] = useState<SearchFormData>();
    const { parseHealthcareOrganization } = useParseHealthcareOrganization();

    const query = useQuery({
        queryKey: ['search', searchQuery], // eslint-disable-line @tanstack/query/exhaustive-deps
        queryFn: async () => {
            const searchResults = await search(searchQuery!);
            return searchResults.organizations.map(parseHealthcareOrganization);
        },
        enabled: !!searchQuery,
        retry: 0,
    });

    return (
        <div className="flex flex-grow flex-col">
            <Helmet
                title={_(
                    msg({
                        id: 'add_organization.heading',
                        message: 'Voeg een zorgaanbieder toe',
                    })
                )}
            />

            <Container>
                <BackButton />
            </Container>

            <Container className="mb-4 max-w-md">
                <Heading asChild size="lg" className="mb-4 md:mb-6">
                    <h1 ref={navFocusRef}>
                        <Trans id="add_organization.heading">Voeg een zorgaanbieder toe</Trans>
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
                            <Trans id="add_organization.searching">
                                Zorgaanbieders aan het zoeken...
                            </Trans>
                        </QueryState.Loading>
                    }
                    renderNoResult={
                        <QueryState.NoResult
                            illustration="woman-on-couch-exclamation"
                            title={_(
                                msg({
                                    id: 'add_organization.no_results_found',
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
