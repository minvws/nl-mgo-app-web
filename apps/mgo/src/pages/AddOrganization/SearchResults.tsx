import { FormattedMessage, useIntl } from '$/intl';
import { useNavigate } from '$/routing';
import { type HealthcareOrganizationSearchResult } from '$/services/load/load';
import { useStore } from '$/store';
import { Button, HealthcareOrganizationCard, Stack, cn } from '@minvws/mgo-ui';
import { useState, type HTMLAttributes } from 'react';

interface SearchResultsProps extends HTMLAttributes<HTMLElement> {
    readonly searchResults: HealthcareOrganizationSearchResult[];
}

export const RESULTS_PER_PAGE = 15;

export const SearchResults = ({ searchResults, className, ...rest }: SearchResultsProps) => {
    const [showResultsLength, setShowResultsLength] = useState(RESULTS_PER_PAGE);
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const hasOrganizationById = useStore.use.hasOrganizationById();
    const addOrganization = useStore.use.addOrganization();

    const results = searchResults.map((searchResult) => {
        return {
            ...searchResult,
            name: searchResult.name ?? formatMessage('common.unknown'),
            isAdded: hasOrganizationById(searchResult.id),
            isNotSupported: !searchResult.dataServices.length,
        };
    });
    const resultsShown = results.slice(0, showResultsLength);

    const handleHealthcareOrganizationClick = (
        healthcareOrganization: HealthcareOrganizationSearchResult
    ) => {
        addOrganization(healthcareOrganization);
        navigate('/zorgaanbieder-toevoegen/zorgaanbieders');
    };

    return (
        <div className={cn('w-full text-center', className)} {...rest}>
            <Stack asChild className="w-full gap-2 sm:gap-4">
                <ul>
                    {resultsShown.map((healthcareOrganization) => {
                        const { isAdded, isNotSupported, id, name, address } =
                            healthcareOrganization;

                        if (isAdded) {
                            return (
                                <li key={id}>
                                    <HealthcareOrganizationCard
                                        onActionClick={() =>
                                            navigate('/zorgaanbieder-toevoegen/zorgaanbieders')
                                        }
                                        title={name}
                                        meta={address}
                                        icon="chevron_right"
                                        iconAriaLabel={formatMessage(
                                            'add_organization.voice_over_to_overview'
                                        )}
                                        checkMessage={formatMessage(
                                            'add_organization.already_added'
                                        )}
                                    />
                                </li>
                            );
                        }

                        if (isNotSupported) {
                            return (
                                <li key={id}>
                                    <HealthcareOrganizationCard
                                        title={name}
                                        meta={address}
                                        infoMessage={formatMessage(
                                            'add_organization.not_participating'
                                        )}
                                    />
                                </li>
                            );
                        }

                        return (
                            <li key={id}>
                                <HealthcareOrganizationCard
                                    onActionClick={() =>
                                        handleHealthcareOrganizationClick(healthcareOrganization)
                                    }
                                    title={name}
                                    meta={address}
                                    icon="add"
                                    iconAriaLabel={formatMessage('common.add')}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Stack>

            {showResultsLength < searchResults.length && (
                <Button
                    variant="ghost"
                    rightIcon="autorenew"
                    className="mt-12"
                    onClick={() => setShowResultsLength(showResultsLength + RESULTS_PER_PAGE)}
                >
                    <FormattedMessage
                        id="add_organization.load_more"
                        description="Meer zorgaanbieders laden"
                    />
                </Button>
            )}
        </div>
    );
};
