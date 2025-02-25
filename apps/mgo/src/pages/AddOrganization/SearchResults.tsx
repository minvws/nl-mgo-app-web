import { type ParsedHealthcareOrganization } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { useNavigate } from '$/routing';
import { useOrganizationsStore } from '$/store';
import { Button, HealthcareOrganizationCard, Icon, Stack, cn } from '@minvws/mgo-mgo-ui';
import { useState, type HTMLAttributes } from 'react';

interface SearchResultsProps extends HTMLAttributes<HTMLElement> {
    readonly searchResults: ParsedHealthcareOrganization[];
}

export const RESULTS_PER_PAGE = 15;

export const SearchResults = ({ searchResults, className, ...rest }: SearchResultsProps) => {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const { addOrganization, hasOrganizationById } = useOrganizationsStore();
    const [showResultsLength, setShowResultsLength] = useState(RESULTS_PER_PAGE);

    const handleHealthcareOrganisationClick = (id: string) => {
        const healthcareOrganisation = searchResults.find((p) => p.id === id);
        if (healthcareOrganisation) {
            addOrganization(healthcareOrganisation);
            navigate('/zorgaanbieder-toevoegen/zorgaanbieders');
        }
    };

    const showResults = searchResults.slice(0, showResultsLength);

    return (
        <Stack className={cn('flex-grow gap-12', className)} {...rest}>
            <Stack asChild className="gap-2 sm:gap-4">
                <ul>
                    {showResults.map(({ id, name, address }) => {
                        const isAdded = hasOrganizationById(id);

                        return (
                            <li key={id}>
                                {isAdded ? (
                                    <HealthcareOrganizationCard
                                        onActionClick={() =>
                                            navigate('/zorgaanbieder-toevoegen/zorgaanbieders')
                                        }
                                        className="w-full"
                                        title={name}
                                        meta={<span className="whitespace-pre">{address}</span>}
                                        icon="chevron-right"
                                        iconAriaLabel={formatMessage(
                                            'add_organization.voice_over_to_overview'
                                        )}
                                    >
                                        <div className="text-sky-blue-600 mt-2 flex items-center gap-2">
                                            <Icon icon="check" className="h-7 w-9" />
                                            <FormattedMessage
                                                id="add_organization.already_added"
                                                description="Deze zorgaanbieder heb je al toegevoegd"
                                            />
                                        </div>
                                    </HealthcareOrganizationCard>
                                ) : (
                                    <HealthcareOrganizationCard
                                        onActionClick={() => handleHealthcareOrganisationClick(id)}
                                        className="w-full"
                                        title={name}
                                        meta={<span className="whitespace-pre">{address}</span>}
                                        icon="add"
                                        iconAriaLabel={formatMessage('common.add')}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ul>
            </Stack>

            {showResultsLength < searchResults.length && (
                <Button
                    variant="ghost"
                    rightIcon="autorenew"
                    onClick={() => setShowResultsLength(showResultsLength + RESULTS_PER_PAGE)}
                >
                    <FormattedMessage
                        id="add_organization.load_more"
                        description="Meer zorgaanbieders laden"
                    />
                </Button>
            )}
        </Stack>
    );
};
