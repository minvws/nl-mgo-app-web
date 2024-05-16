import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef, useOnboardingSeen } from '$/hooks';
import { Link } from '$/routing';
import { Trans } from '@lingui/macro';
import { Button, Container, Heading, List, ListIcon, ListItem, Text } from '@minvws/mgo-mgo-ui';

export function OnboardingProposition() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { setOnboardingSeen } = useOnboardingSeen();

    return (
        <>
            <Container>
                <BackButton to="/welkom" />
            </Container>

            <Container className="max-w-md pb-12 md:pb-16 lg:pb-24">
                <div className="max-w-sm">
                    <Heading asChild size="lg" className="mb-4 md:mb-6">
                        <h1 ref={navFocusRef}>
                            <Trans id="onboarding.proposition.heading">
                                Zo gebruikt de website jouw gegevens
                            </Trans>
                        </h1>
                    </Heading>

                    <Text className="mb-6 md:mb-12">
                        <Trans id="onboarding.proposition.list-description">
                            In de privacy&shy;verklaring staat hoe Mijn
                            Gezond&shy;heids&shy;overzicht jouw gegevens gebruikt. Dit zijn de
                            belangrijkste punten:
                        </Trans>
                    </Text>

                    <Text asChild>
                        <List className="mb-12">
                            <ListItem className="flex">
                                <ListIcon icon="encrypted" className="fill-[#34C759]" />
                                <span>
                                    <Trans id="onboarding.proposition.usp.1">
                                        Je gegevens worden <b>versleuteld</b> en via een{' '}
                                        <b>veilige</b> verbinding opgehaald.
                                    </Trans>
                                </span>
                            </ListItem>
                            <ListItem className="flex">
                                <ListIcon icon="health-and-safety" className="fill-[#34C759]" />
                                <span>
                                    <Trans id="onboarding.proposition.usp.2">
                                        De website haalt je gegevens direct op bij de
                                        zorg&shy;verleners die jij kiest.{' '}
                                        <b>Alleen jij hebt toegang.</b>
                                    </Trans>
                                </span>
                            </ListItem>
                            <ListItem className="flex">
                                <ListIcon icon="verified-user" className="fill-[#34C759]" />
                                <span>
                                    <Trans id="onboarding.proposition.usp.3">
                                        <b>Je kiest zelf</b> hoe je je gegevens wilt gebruiken en of
                                        je ze wel of niet deelt met anderen.
                                    </Trans>
                                </span>
                            </ListItem>
                            <ListItem className="flex">
                                <ListIcon icon="gpp-bad" className="fill-[#34C759]" />
                                <span>
                                    <Trans id="onboarding.proposition.usp.4">
                                        Je kunt de gegevens in je overzicht{' '}
                                        <b>altijd verwijderen of opnieuw opvragen.</b>
                                    </Trans>
                                </span>
                            </ListItem>
                        </List>
                    </Text>

                    <Button asChild onClick={() => setOnboardingSeen(true)}>
                        <Link to="/zorgaanbieder-toevoegen">
                            <Trans id="common.next">Volgende</Trans>
                        </Link>
                    </Button>
                </div>
            </Container>
        </>
    );
}
