import { useNavigate } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store';
import { type HealthcareOrganizationDTO } from '$/types/Organisation';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, HealthcareOrganizationButton, Icon, Stack, cn } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes, useState } from 'react';

interface SearchResultsProps extends HTMLAttributes<HTMLElement> {
    searchResults: HealthcareOrganizationDTO[];
}

export const RESULTS_PER_PAGE = 15;

export const SearchResults = ({ searchResults, className, ...rest }: SearchResultsProps) => {
    const { _ } = useLingui();
    const navigate = useNavigate();
    const { addHealthcareOrganization, hasHealthcareOrganization } =
        useHealthcareOrganizationsStore();
    const [showResultsLength, setShowResultsLength] = useState(RESULTS_PER_PAGE);

    const handleHealthcareOrganisationClick = ({
        identification_type,
        identification_value,
    }: Pick<HealthcareOrganizationDTO, 'identification_type' | 'identification_value'>) => {
        const healthcareOrganisation = searchResults.find(
            (p) =>
                p.identification_type === identification_type &&
                p.identification_value === identification_value
        );
        if (healthcareOrganisation) {
            addHealthcareOrganization(healthcareOrganisation);
            navigate('/zorgaanbieder-toevoegen/zorgaanbieders');
        }
    };

    const getBasicOrganisationInfo = ({
        identification_value,
        identification_type,
        display_name,
        addresses,
    }: HealthcareOrganizationDTO) => {
        return {
            id: `${identification_type}_${identification_value}`,
            name: display_name,
            address: addresses[0].address,
            identification_type,
            identification_value,
        };
    };

    const showResults = searchResults.slice(0, showResultsLength).map(getBasicOrganisationInfo);

    return (
        <Stack className={cn('flex-grow gap-12', className)} {...rest}>
            <Stack asChild className="gap-2 sm:gap-4">
                <ul>
                    {showResults.map(
                        ({ id, name, address, identification_type, identification_value }) => {
                            const isAdded = hasHealthcareOrganization({
                                identification_type,
                                identification_value,
                            });

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
                                                    id: 'add-healthcare-provider.aria-label-is-added',
                                                    message: 'naar overzicht',
                                                })
                                            )}
                                        >
                                            <div className="text-sky-blue-600 mt-2 flex items-center gap-2">
                                                <Icon icon="check" className="h-7 w-9" />
                                                <Trans id="add-healthcare-provider.is-added">
                                                    Deze zorgaanbieder heb je al toegevoegd
                                                </Trans>
                                            </div>
                                        </HealthcareOrganizationButton>
                                    ) : (
                                        <HealthcareOrganizationButton
                                            onClick={() =>
                                                handleHealthcareOrganisationClick({
                                                    identification_type,
                                                    identification_value,
                                                })
                                            }
                                            className="w-full"
                                            title={name}
                                            meta={<span className="whitespace-pre">{address}</span>}
                                            icon="add"
                                            iconAriaLabel={_(
                                                msg({
                                                    id: 'add-healthcare-provider.add',
                                                    message: 'toevoegen',
                                                })
                                            )}
                                        />
                                    )}
                                </li>
                            );
                        }
                    )}
                </ul>
            </Stack>

            {showResultsLength < searchResults.length && (
                <Button
                    variant="ghost"
                    rightIcon="autorenew"
                    onClick={() => setShowResultsLength(showResultsLength + RESULTS_PER_PAGE)}
                >
                    <Trans id="add-healthcare-provider.load_more">Meer zorgaanbieders laden</Trans>
                </Button>
            )}
        </Stack>
    );
};
