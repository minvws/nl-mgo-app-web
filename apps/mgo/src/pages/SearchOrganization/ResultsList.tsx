import { FormattedMessage } from '$/intl';
import { SearchResults as OrgSearchResults, SearchResult } from '@minvws/mgo-org-search';
import { Button, Stack, Text, useOpenState } from '@minvws/mgo-ui';
import { useRef, useState, type HTMLAttributes } from 'react';
import { AddOrganizationDialog } from './AddOrganizationDialog';
import { ResultsListItem } from './ResultsListItem';

interface ResultsListProps extends HTMLAttributes<HTMLElement> {
    readonly searchResults: OrgSearchResults;
    readonly dataServiceEndpoints: Record<string, string>;
}

export const RESULTS_PER_PAGE = 15;

export const ResultsList = ({ searchResults, dataServiceEndpoints, ...rest }: ResultsListProps) => {
    const [showResultsLength, setShowResultsLength] = useState(RESULTS_PER_PAGE);
    const [selectedSearchResult, setSelectedSearchResult] = useState<SearchResult | null>(null);
    const confirmDialogTriggerRef = useRef<HTMLButtonElement>(null);
    const {
        isOpen: isConfirmDialogOpen,
        open: openConfirmDialog,
        setIsOpen: setIsConfirmDialogOpen,
    } = useOpenState();

    const shownResults = searchResults.hits.slice(0, showResultsLength);

    return (
        <div {...rest}>
            <Text as="p" className="text-t-label-secondary mb-4">
                <FormattedMessage
                    id="organization_search.results_count"
                    description="$count zorgaanbieders gevonden"
                    values={{ count: searchResults.count }}
                />
            </Text>

            <Stack as="ul" className="w-full gap-2 sm:gap-4">
                {shownResults.map((searchResult) => (
                    <li key={searchResult.id}>
                        <ResultsListItem
                            searchResult={searchResult}
                            ref={
                                selectedSearchResult?.id === searchResult.id
                                    ? confirmDialogTriggerRef
                                    : undefined
                            }
                            onClick={() => {
                                setSelectedSearchResult(searchResult);
                                openConfirmDialog();
                            }}
                        />
                    </li>
                ))}
            </Stack>

            {searchResults.hits.length > shownResults.length && (
                <div className="mt-8 text-center">
                    <Button
                        variant="outline"
                        onClick={() => setShowResultsLength(showResultsLength + RESULTS_PER_PAGE)}
                    >
                        <FormattedMessage
                            id="add_organization.load_more"
                            description="Meer zorgaanbieders laden"
                        />
                    </Button>
                </div>
            )}

            <AddOrganizationDialog
                isOpen={isConfirmDialogOpen}
                setIsOpen={setIsConfirmDialogOpen}
                selectedSearchResult={selectedSearchResult}
                dataServiceEndpoints={dataServiceEndpoints}
                confirmDialogTriggerRef={confirmDialogTriggerRef}
            />
        </div>
    );
};
