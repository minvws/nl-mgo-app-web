/* c8 ignore start - this is still a work in progress, will be added to coverage later */

import { FormattedMessage, useIntl } from '$/intl';
import { SearchResults as OrgSearchResults, SearchResultDocument } from '@minvws/mgo-org-search';
import { Button, ConfirmDialog, OrganizationButton, Stack, Text } from '@minvws/mgo-ui';
import { useState, type HTMLAttributes } from 'react';

interface SearchResultsProps extends HTMLAttributes<HTMLElement> {
    readonly searchResults: OrgSearchResults;
}

export const RESULTS_PER_PAGE = 15;

export const SearchResults = ({ searchResults, ...rest }: SearchResultsProps) => {
    const [showResultsLength, setShowResultsLength] = useState(RESULTS_PER_PAGE);
    const { formatMessage } = useIntl();
    // const navigate = useNavigate();
    // const hasOrganizationById = useStore.use.hasOrganizationById();
    // const addOrganization = useStore.use.addOrganization();
    const [selectedOrganization, setSelectedOrganization] = useState<SearchResultDocument | null>(
        null
    );

    const shownResults = searchResults.hits.slice(0, showResultsLength).map((searchResult) => {
        const { displayName, addressLine, city } = searchResult.document;
        return {
            ...searchResult.document,
            name: displayName,
            address: `${addressLine} ${city}`,
            isAdded: false,
            isNotSupported: false,
            // isAdded: hasOrganizationById(searchResult.id),
            // isNotSupported: !searchResult.dataServices.length,
        };
    });

    const addSelectedOrganization = () => {
        /* c8 ignore start - this can't happen, but we need to satisfy the type checker */
        if (!selectedOrganization) return;
        /* c8 ignore end */
        console.log(`add organization:`, selectedOrganization);
        // addOrganization(selectedOrganization);
        // navigate('/zorgaanbieders');
    };

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
                {shownResults.map((healthcareOrganization) => {
                    const { isAdded, isNotSupported, id, name, address } = healthcareOrganization;

                    if (isAdded) {
                        return (
                            <li key={id}>
                                <OrganizationButton
                                    disabled
                                    title={name}
                                    subTitle={address}
                                    successMessage={formatMessage('add_organization.already_added')}
                                />
                            </li>
                        );
                    }

                    if (isNotSupported) {
                        return (
                            <li key={id}>
                                <OrganizationButton
                                    disabled
                                    title={name}
                                    subTitle={address}
                                    infoMessage={formatMessage(
                                        'add_organization.not_participating'
                                    )}
                                />
                            </li>
                        );
                    }

                    return (
                        <li key={id}>
                            <OrganizationButton
                                onClick={() => setSelectedOrganization(healthcareOrganization)}
                                title={name}
                                subTitle={address}
                            />
                        </li>
                    );
                })}
            </Stack>

            {searchResults.count > shownResults.length && (
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

            <ConfirmDialog
                open={!!selectedOrganization}
                onOpenChange={() => setSelectedOrganization(null)}
                title={formatMessage('dialog.add_organization_heading', {
                    organizationName: selectedOrganization?.displayName,
                })}
                description={formatMessage('dialog.add_organization_subheading')}
                confirmButtonText={formatMessage('dialog.add_organization_yes')}
                cancelButtonText={formatMessage('dialog.add_organization_no')}
                closeButtonAriaLabel={formatMessage('common.voice_over_close')}
                onConfirm={addSelectedOrganization}
            />
        </div>
    );
};
