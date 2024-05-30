import { Link } from '$/routing';
import { type HealthcareOrganization } from '$/store/healthcareProviders';
import { Trans } from '@lingui/macro';
import { Button, ButtonCard, Stack } from '@minvws/mgo-mgo-ui';

interface ResultsProps {
    organizations: HealthcareOrganization[];
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
                    {organizations.map(({ slug, display_name, types }) => (
                        <li key={slug}>
                            <ButtonCard
                                asChild
                                title={display_name}
                                description={types[0].display_name}
                            >
                                <Link to={`/overzicht/${slug}`} />
                            </ButtonCard>
                        </li>
                    ))}
                </ul>
            </Stack>

            <Button asChild className="self-start">
                <Link to="/zorgaanbieder-toevoegen">
                    <Trans id="overview.add">Voeg een zorgaanbieder toe</Trans>
                </Link>
            </Button>
        </>
    );
};
