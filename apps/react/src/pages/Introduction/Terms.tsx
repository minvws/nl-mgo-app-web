import { useIntroSeen } from '$/lib/introSeen';
import { useNavFocusRef } from '$/lib/useNavFocusRef';
import { Button, Heading, List, ListIcon, ListItem } from '@minvws/mgo-react-ui';
import { useNavigate, Link } from 'react-router-dom';
import { Container } from '@minvws/mgo-react-ui';

export function Terms() {
    const navigate = useNavigate();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { setIntroSeen } = useIntroSeen();

    return (
        <>
            <Container>
                <Button
                    variant="link"
                    leftIcon="ChevronLeft"
                    className="my-3 pl-0"
                    onClick={() => navigate(-1)}
                >
                    Vorige
                </Button>
            </Container>

            <Container className="max-w-md">
                <div className="max-w-sm">
                    <Heading asChild size="lg" className="mb-6">
                        <h1 ref={navFocusRef}>Zo gebruikt de website jouw gegevens</h1>
                    </Heading>
                    <p className="mb-6">
                        In de privacy&shy;verklaring staat hoe Mijn Gezond&shy;heids&shy;overzicht
                        jouw gegevens gebruikt. Dit zijn de belangrijkste punten:
                    </p>
                    <List className="mb-12">
                        <ListItem className="flex text-lg">
                            <ListIcon name="Encrypted" className="fill-[#34C759]" />
                            <span>
                                Je gegevens worden <b>versleuteld</b> en via een <b>veilige</b>{' '}
                                verbinding opgehaald.
                            </span>
                        </ListItem>
                        <ListItem className="flex text-lg">
                            <ListIcon name="HealthAndSafety" className="fill-[#34C759]" />
                            <span>
                                De website haalt je gegevens direct op bij de zorg&shy;verleners die
                                jij kiest. <b>Alleen jij hebt toegang.</b>
                            </span>
                        </ListItem>
                        <ListItem className="flex text-lg">
                            <ListIcon name="VerifiedUser" className="fill-[#34C759]" />
                            <span>
                                <b>Je kiest zelf</b> hoe je je gegevens wilt gebruiken en of je ze
                                wel of niet deelt met anderen.
                            </span>
                        </ListItem>
                        <ListItem className="flex text-lg">
                            <ListIcon name="GppBad" className="fill-[#34C759]" />
                            <span>
                                Je kunt de gegevens in je overzicht{' '}
                                <b>altijd verwijderen of opnieuw opvragen.</b>
                            </span>
                        </ListItem>
                    </List>
                    <Button asChild onClick={() => setIntroSeen(true)} className="mb-16">
                        <Link to="/overzicht">Volgende</Link>
                    </Button>
                </div>
            </Container>
        </>
    );
}
