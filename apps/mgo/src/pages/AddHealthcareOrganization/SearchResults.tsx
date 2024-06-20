import { type ParsedHealthcareOrganization } from '$/hooks';
import { useNavigate } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, HealthcareOrganizationButton, Icon, Stack, cn } from '@minvws/mgo-mgo-ui';
import { useState, type HTMLAttributes } from 'react';

interface SearchResultsProps extends HTMLAttributes<HTMLElement> {
    searchResults: ParsedHealthcareOrganization[];
}

export const RESULTS_PER_PAGE = 15;

export const SearchResults = ({ searchResults, className, ...rest }: SearchResultsProps) => {
    const { _ } = useLingui();
    const navigate = useNavigate();
    const { addOrganization, hasOrganizationById } = useHealthcareOrganizationsStore();
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
                                    <HealthcareOrganizationButton
                                        onClick={() =>
                                            navigate('/zorgaanbieder-toevoegen/zorgaanbieders')
                                        }
                                        className="w-full"
                                        title={name}
                                        meta={<span className="whitespace-pre">{address}</span>}
                                        icon="chevron-right"
                                        iconAriaLabel={_(
                                            msg({
                                                id: 'add-healthcare-organization.aria-label-is-added',
                                                message: 'naar overzicht',
                                            })
                                        )}
                                    >
                                        <div className="text-sky-blue-600 mt-2 flex items-center gap-2">
                                            <Icon icon="check" className="h-7 w-9" />
                                            <Trans id="add-healthcare-organization.is-added">
                                                Deze zorgaanbieder heb je al toegevoegd
                                            </Trans>
                                        </div>
                                    </HealthcareOrganizationButton>
                                ) : (
                                    <HealthcareOrganizationButton
                                        onClick={() => handleHealthcareOrganisationClick(id)}
                                        className="w-full"
                                        title={name}
                                        meta={<span className="whitespace-pre">{address}</span>}
                                        icon="add"
                                        iconAriaLabel={_(
                                            msg({
                                                id: 'add-healthcare-organization.add',
                                                message: 'toevoegen',
                                            })
                                        )}
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
                    <Trans id="add-healthcare-organization.load_more">
                        Meer zorgaanbieders laden
                    </Trans>
                </Button>
            )}
        </Stack>
    );
};
