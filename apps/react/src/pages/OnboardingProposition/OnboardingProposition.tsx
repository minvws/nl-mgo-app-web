import { useOnboardingSeen } from '$/hooks';
import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Button, Container, Heading, List, ListIcon, ListItem } from '@minvws/mgo-react-ui';
import { Link, useNavigate } from '$/routing';

export function OnboardingProposition() {
    const navigate = useNavigate();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { setOnboardingSeen } = useOnboardingSeen();

    return (
        <>
            <Container>
                <Button
                    variant="link"
                    leftIcon="ChevronLeft"
                    className="my-3 pl-0"
                    onClick={() => navigate(-1)}
                >
                    <Trans id="common.previous">Vorige</Trans>
                </Button>
            </Container>

            <Container className="max-w-md">
                <div className="max-w-sm">
                    <Heading asChild size="lg" className="mb-6">
                        <h1 ref={navFocusRef}>
                            <Trans id="onboarding.proposition.heading">
                                Zo gebruikt de website jouw gegevens
                            </Trans>
                        </h1>
                    </Heading>
                    <p className="mb-6">
                        <Trans id="onboarding.proposition.list-description">
                            In de privacy&shy;verklaring staat hoe Mijn
                            Gezond&shy;heids&shy;overzicht jouw gegevens gebruikt. Dit zijn de
                            belangrijkste punten:
                        </Trans>
                    </p>
                    <List className="mb-12">
                        <ListItem className="flex text-lg">
                            <ListIcon name="Encrypted" className="fill-[#34C759]" />
                            <span>
                                <Trans id="onboarding.proposition.usp.1">
                                    Je gegevens worden <b>versleuteld</b> en via een <b>veilige</b>{' '}
                                    verbinding opgehaald.
                                </Trans>
                            </span>
                        </ListItem>
                        <ListItem className="flex text-lg">
                            <ListIcon name="HealthAndSafety" className="fill-[#34C759]" />
                            <span>
                                <Trans id="onboarding.proposition.usp.2">
                                    De website haalt je gegevens direct op bij de zorg&shy;verleners
                                    die jij kiest. <b>Alleen jij hebt toegang.</b>
                                </Trans>
                            </span>
                        </ListItem>
                        <ListItem className="flex text-lg">
                            <ListIcon name="VerifiedUser" className="fill-[#34C759]" />
                            <span>
                                <Trans id="onboarding.proposition.usp.3">
                                    <b>Je kiest zelf</b> hoe je je gegevens wilt gebruiken en of je
                                    ze wel of niet deelt met anderen.
                                </Trans>
                            </span>
                        </ListItem>
                        <ListItem className="flex text-lg">
                            <ListIcon name="GppBad" className="fill-[#34C759]" />
                            <span>
                                <Trans id="onboarding.proposition.usp.4">
                                    Je kunt de gegevens in je overzicht{' '}
                                    <b>altijd verwijderen of opnieuw opvragen.</b>
                                </Trans>
                            </span>
                        </ListItem>
                    </List>
                    <Button asChild onClick={() => setOnboardingSeen(true)} className="mb-16">
                        <Link to="/zorgverlener-toevoegen">
                            <Trans id="common.next">Volgende</Trans>
                        </Link>
                    </Button>
                </div>
            </Container>
        </>
    );
}
