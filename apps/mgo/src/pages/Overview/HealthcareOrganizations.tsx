import { RouterLink } from '$/routing';
import { type HealthcareOrganization } from '$/store/healthcareOrganizations';
import { Trans } from '@lingui/macro';
import { Button, ButtonCard, Stack } from '@minvws/mgo-mgo-ui';

interface ResultsProps {
    readonly organizations: HealthcareOrganization[];
}

export const HealthcareOrganizations = ({ organizations }: ResultsProps) => {
    return (
        <>
            <p className="sm:text-md text-sm text-gray-700 md:text-lg lg:text-xl dark:text-white">
                <Trans id="overview.subheading">
                    Dit is je persoonlijke overzicht. Je vindt hier al je medische gegevens.
                </Trans>
            </p>

            <Stack asChild className="-mx-4 my-6 gap-1 sm:mx-0 sm:gap-2 md:my-12">
                <ul>
                    {organizations.map(({ slug, name, category }) => (
                        <li key={slug}>
                            <ButtonCard asChild title={name} description={category}>
                                <RouterLink to={`/overzicht/${slug}`} />
                            </ButtonCard>
                        </li>
                    ))}
                </ul>
            </Stack>

            <Button asChild className="self-start">
                <RouterLink to="/zorgaanbieder-toevoegen">
                    <Trans id="overview.add">Voeg een zorgaanbieder toe</Trans>
                </RouterLink>
            </Button>
        </>
    );
};
