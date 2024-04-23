import { useNavFocusRef } from '$/hooks';
import { useAuth } from '$/lib/auth';
import { Link } from '$/routing';
import { useHealthcareProvidersStore } from '$/store';
import { Trans } from '@lingui/macro';
import { ButtonCard, Heading, Stack } from '@minvws/mgo-react-ui';

export function Overview() {
    const auth = useAuth();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    const { healthcareProviders } = useHealthcareProvidersStore();

    return (
        <div className="flex-grow">
            <Heading asChild size="lg" className="mb-2 sm:mb-4 md:mb-6">
                <h1 ref={navFocusRef}>
                    <Trans id="overview.heading">Goedemorgen, Wendy</Trans>
                </h1>
            </Heading>
            <p className="sm:text-md mb-6 text-sm text-gray-700 md:mb-12 md:text-lg lg:text-xl dark:text-white">
                <Trans id="overview.subheading">
                    Dit is je persoonlijke overzicht. Je vindt hier al je medische gegevens.
                </Trans>
            </p>

            {healthcareProviders.length ? (
                <Stack asChild className="-mx-4 mb-6 gap-1 sm:mx-0 sm:gap-2 md:mb-12">
                    <ul>
                        {healthcareProviders.map(({ slug, organisation }) => (
                            <li key={slug}>
                                <ButtonCard
                                    asChild
                                    title={organisation.display_name}
                                    description="Ziekenhuis"
                                    icon="hospital"
                                >
                                    <Link to={`/overzicht/${slug}`} />
                                </ButtonCard>
                            </li>
                        ))}
                    </ul>
                </Stack>
            ) : (
                <div>
                    <Trans id="overview.no-results">Geen zorgverleners gevonden.</Trans>
                </div>
            )}

            <p className="text-md text-gray-500">
                <Trans id="overview.last_refresh">
                    Je overzicht is <strong>vandaag</strong> voor het laatst bijgewerkt om{' '}
                    <strong>09:41</strong>
                </Trans>
            </p>

            <button onClick={() => void auth.removeUser()} className="mb-8 text-lg font-bold">
                <Trans id="common.logout">Uitloggen</Trans>
            </button>
        </div>
    );
}
