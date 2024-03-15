import { ButtonCard, Heading, Stack } from '@minvws/mgo-react-ui';
import { useAuth } from '$/lib/auth';
import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Link } from '$/routing';

export function Overview() {
    const auth = useAuth();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <div className="flex-grow">
            <Heading asChild size="lg" className="mb-2 sm:mb-4 md:mb-6">
                <h1 ref={navFocusRef}>
                    <Trans id="overview.heading">Goedemorgen, Wendy</Trans>
                </h1>
            </Heading>
            <p className="text-grey-700 text-md mb-6 sm:text-lg md:mb-12 md:text-xl lg:text-2xl dark:text-white">
                <Trans id="overview.subheading">
                    Dit is je persoonlijke overzicht. Je vindt hier al je medische gegevens.
                </Trans>
            </p>
            <Stack asChild className="mb-6 gap-2 md:mb-12">
                <ul>
                    <li>
                        <ButtonCard
                            asChild
                            title="UMC Groningen"
                            description="Ziekenhuis"
                            icon="Hospital"
                        >
                            <Link to="#umg-groningen" />
                        </ButtonCard>
                    </li>
                    <ButtonCard
                        asChild
                        title="BENU Apotheek Wester"
                        description="Apotheek"
                        icon="Esculaap"
                    >
                        <Link to="#benu-apotheek-wester" />
                    </ButtonCard>
                    <ButtonCard isLoading />
                </ul>
            </Stack>
            <p className="text-grey-500 text-lg">
                <Trans id="overview.last_refresh">
                    Je overzicht is <strong>vandaag</strong> voor het laatst bijgewerkt om{' '}
                    <strong>09:41</strong>
                </Trans>
            </p>
            <button onClick={() => void auth.removeUser()} className="mb-8 text-xl font-bold">
                <Trans id="common.logout">Uitloggen</Trans>
            </button>
        </div>
    );
}
