import { search } from '$/api/location';
import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Alert, Button, Container, Heading, Spinner } from '@minvws/mgo-react-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { SearchForm, type SearchFormData } from './SearchForm';
import { NoSearchResults } from './NoSearchResults';
import { SearchResults } from './SearchResults';

export function AddHealthcareProvider() {
    const navigate = useNavigate();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const [searchQuery, setSearchQuery] = useState<SearchFormData>();

    const {
        isLoading,
        error,
        data: searchResponse,
    } = useQuery({
        queryKey: ['search', searchQuery],
        queryFn: () => search(searchQuery!),
        enabled: !!searchQuery,
        retry: 0,
    });

    return (
        <div className="flex flex-grow flex-col">
            <Container>
                <Button
                    variant="link"
                    leftIcon="chevron-left"
                    className="my-3 pl-0"
                    onClick={() => navigate(-1)}
                >
                    <Trans id="common.previous">Vorige</Trans>
                </Button>
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

            {error && (
                <Container className="my-6 flex max-w-md justify-center md:my-12">
                    <Alert
                        status="warning"
                        label="Ophalen zorgverleners mislukt"
                        description={error.message}
                    />
                </Container>
            )}

            {isLoading && (
                <Container className="flex min-h-80 flex-grow flex-col items-center justify-center gap-4">
                    <Spinner className="fill-sky-blue-600 h-16 w-16" />
                    <span
                        className="text-md leading-normal text-black dark:text-white"
                        aria-live="polite"
                    >
                        <Trans id="add-healthcare-provider.search_text">
                            Zorgverleners aan het zoeken...
                        </Trans>
                    </span>
                </Container>
            )}

            {searchResponse && (
                <Container className="flex max-w-md flex-grow">
                    {searchResponse?.organizations.length ? (
                        <SearchResults results={searchResponse.organizations} />
                    ) : (
                        <NoSearchResults />
                    )}
                </Container>
            )}
        </div>
    );
}
