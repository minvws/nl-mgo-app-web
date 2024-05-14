import { Link } from '$/routing';
import { type HealthcareOrganization } from '$/store/healthcareProviders';
import { Trans } from '@lingui/macro';
import { ButtonCard, Stack } from '@minvws/mgo-mgo-ui';

interface ResultsProps {
    organizations: HealthcareOrganization[];
}

export const HealthcareOrganizations = ({ organizations }: ResultsProps) => {
    return (
        <>
            <p className="sm:text-md mb-6 text-sm text-gray-700 md:mb-12 md:text-lg lg:text-xl dark:text-white">
                <Trans id="overview.subheading">
                    Dit is je persoonlijke overzicht. Je vindt hier al je medische gegevens.
                </Trans>
            </p>

            <Stack asChild className="-mx-4 mb-6 gap-1 sm:mx-0 sm:gap-2 md:mb-12">
                <ul>
                    {organizations.map(({ slug, display_name, types }) => (
                        <li key={slug}>
                            <ButtonCard
                                asChild
                                title={display_name}
                                description={types[0].display_name}
                                icon="hospital"
                            >
                                <Link to={`/overzicht/${slug}`} />
                            </ButtonCard>
                        </li>
                    ))}
                    <li>
                        <ButtonCard
                            asChild
                            title="Zorgaanbieder toevoegen"
                            className="items-center"
                        >
                            <Link to={'/zorgaanbieder-toevoegen'} />
                        </ButtonCard>
                    </li>
                </ul>
            </Stack>
        </>
    );
};
