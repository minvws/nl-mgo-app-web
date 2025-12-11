/* c8 ignore start - this is only a POC */
import { FormattedMessage, useIntl } from '$/intl';
import { Button, ConfirmDialog, OrganizationButton, Stack, Text } from '@minvws/mgo-ui';
import { useState, type HTMLAttributes } from 'react';
import { OrganizationItem } from './useSearch/types';

interface SearchResultsProps extends HTMLAttributes<HTMLElement> {
    readonly searchResults: string[];
    readonly indexedData: Record<string, OrganizationItem>;
}

export const RESULTS_PER_PAGE = 15;

export const SearchResults = ({ searchResults, indexedData, ...rest }: SearchResultsProps) => {
    const [showResultsLength, setShowResultsLength] = useState(RESULTS_PER_PAGE);
    const { formatMessage } = useIntl();
    const [selectedOrganization, setSelectedOrganization] = useState<OrganizationItem | null>(null);

    const addSelectedOrganization = () => {
        if (!selectedOrganization) return;
        console.log(selectedOrganization);
        setSelectedOrganization(null);
    };

    return (
        <div {...rest}>
            <Text as="p" className="text-t-label-secondary mb-4">
                <FormattedMessage
                    id="organization_search.results_count"
                    description="$count zorgaanbieders gevonden"
                    values={{ count: searchResults.length }}
                />
            </Text>

            <Stack as="ul" className="w-full gap-2 sm:gap-4">
                {searchResults.slice(0, showResultsLength).map((organizationId) => {
                    const organization = indexedData[organizationId];
                    if (!organization) {
                        console.error(`organization with id ${organizationId} not found`);
                        return null;
                    }
                    const { id, displayName, addressLine, city } = organization;

                    return (
                        <li key={id}>
                            <OrganizationButton
                                onClick={() => setSelectedOrganization(organization)}
                                title={displayName}
                                subTitle={`${addressLine}, ${city}`}
                            />
                        </li>
                    );
                })}
            </Stack>

            {showResultsLength < searchResults.length && (
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
