/* v8 ignore start - this is still a work in progress, will be added to coverage later */

import { dataServiceConfigs } from '$/config';
import { FormattedMessage, useIntl } from '$/intl';
import { useNavigate } from '$/routing';
import { useStore } from '$/store';
import { SearchResults as OrgSearchResults, Organization } from '@minvws/mgo-org-search';
import { Button, ConfirmDialog, OrganizationButton, Stack, Text } from '@minvws/mgo-ui';
import { useState, type HTMLAttributes } from 'react';
import { hasIntersection } from '../../../../../packages/utils/src/hasIntersection/hasIntersection';

const supportedDataServiceIds = dataServiceConfigs.map((x) => x.id);

interface SearchResultsProps extends HTMLAttributes<HTMLElement> {
    readonly searchResults: OrgSearchResults;
}

export const RESULTS_PER_PAGE = 15;

export const SearchResults = ({ searchResults, ...rest }: SearchResultsProps) => {
    const [showResultsLength, setShowResultsLength] = useState(RESULTS_PER_PAGE);
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const hasOrganizationById = useStore.use.hasOrganizationById();
    const addOrganization = useStore.use.addOrganization();
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);

    const shownResults = searchResults.hits.slice(0, showResultsLength).map((searchResult) => {
        const { displayName, addressLine, city, dataServices } = searchResult.document;
        return {
            ...searchResult.document,
            name: displayName,
            address: `${addressLine} ${city}`,
            isAdded: hasOrganizationById(searchResult.id),
            isSupported: hasIntersection(supportedDataServiceIds, Object.keys(dataServices || {})),
        };
    });

    const addSelectedOrganization = () => {
        /* v8 ignore next line - this can't happen, but we need to satisfy the type checker */
        if (!selectedOrganization) return;
        addOrganization(selectedOrganization);
        navigate('/zorgaanbieders');
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
                    const {
                        isAdded,
                        isSupported,
                        id,
                        name = formatMessage('common.unknown'),
                        address,
                    } = healthcareOrganization;

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

                    if (isSupported) {
                        return (
                            <li key={id}>
                                <OrganizationButton
                                    onClick={() => setSelectedOrganization(healthcareOrganization)}
                                    title={name}
                                    subTitle={address}
                                />
                            </li>
                        );
                    }

                    return (
                        <li key={id}>
                            <OrganizationButton
                                disabled
                                title={name}
                                subTitle={address}
                                infoMessage={formatMessage('add_organization.not_participating')}
                            />
                        </li>
                    );
                })}
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
