import { RouterLink } from '$/routing';
import { type HealthcareOrganization } from '$/store';
import { Button, ButtonCard, Stack } from '@minvws/mgo-mgo-ui';
import { FormattedMessage } from 'react-intl';

interface ResultsProps {
    readonly organizations: HealthcareOrganization[];
}

export const Organizations = ({ organizations }: ResultsProps) => {
    return (
        <>
            <p className="sm:text-md text-sm text-gray-700 md:text-lg lg:text-xl dark:text-white">
                <FormattedMessage
                    id="overview.subheading"
                    description="Dit is je persoonlijke overzicht. Je vindt hier al je medische gegevens."
                />
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
                    <FormattedMessage
                        id="overview.add_organization"
                        description="Voeg een zorgaanbieder toe"
                    />
                </RouterLink>
            </Button>
        </>
    );
};
