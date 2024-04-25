import { type HealthcareOrganisation } from '$/types/Organisation';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, HealthcareOrganisationButton, Stack } from '@minvws/mgo-react-ui';
import { useState } from 'react';

interface SearchResultsProps {
    results: HealthcareOrganisation[];
}

export const RESULTS_PER_PAGE = 15;

export const SearchResults = ({ results }: SearchResultsProps) => {
    const { _ } = useLingui();
    const [showResultsLength, setShowResultsLength] = useState(RESULTS_PER_PAGE);

    const getBasicOrganisationInfo = ({
        identification_value,
        identification_type,
        display_name,
        addresses,
    }: HealthcareOrganisation) => {
        return {
            id: `${identification_type}-${identification_value}`,
            name: display_name,
            address: addresses[0].address,
        };
    };

    const showResults = results.slice(0, showResultsLength).map(getBasicOrganisationInfo);

    return (
        <Stack className="my-6 flex-grow gap-12 md:my-12">
            <Stack asChild className="gap-2 sm:gap-4">
                <ul>
                    {showResults.map(({ id, name, address }) => (
                        <li key={id}>
                            <HealthcareOrganisationButton
                                className="w-full"
                                title={name}
                                meta={<span className="whitespace-pre">{address}</span>}
                                icon="add"
                                iconAriaLabel={_(
                                    msg({ id: 'add-healthcare-provider.add', message: 'toevoegen' })
                                )}
                            />
                        </li>
                    ))}
                </ul>
            </Stack>

            {showResultsLength < results.length && (
                <Button
                    variant="ghost"
                    rightIcon="autorenew"
                    onClick={() => setShowResultsLength(showResultsLength + RESULTS_PER_PAGE)}
                >
                    <Trans id="add-healthcare-provider.load_more">Meer zorgverleners laden</Trans>
                </Button>
            )}
        </Stack>
    );
};
