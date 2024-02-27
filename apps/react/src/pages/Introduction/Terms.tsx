import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, List, ListIcon, ListItem } from '@minvws/mgo-react-ui';
import { useIntroSeen } from '$/lib/introSeen';

export function Terms() {
    const navigate = useNavigate();
    const { setIntroSeen } = useIntroSeen();

    const handleClickNext = () => {
        setIntroSeen(true);
        navigate('/overzicht');
    };

    return (
        <Fragment>
            <Button
                variant="link"
                leftIcon="ChevronLeft"
                children="Vorige"
                className="my-3 pl-0"
                onClick={() => navigate(-1)}
            />
            <section className="mx-auto max-w-2xl">
                <Heading as="h1" size="lg" className="mb-6">
                    Zo gebruikt de website jouw gegevens
                </Heading>
                <p className="mb-6">
                    In de privacy&shy;verklaring staat hoe Mijn Gezond&shy;heids&shy;overzicht jouw
                    gegevens gebruikt. Dit zijn de belangrijkste punten:
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
                            De website haalt je gegevens direct op bij de zorg&shy;verleners die jij
                            kiest. <b>Alleen jij hebt toegang.</b>
                        </span>
                    </ListItem>
                    <ListItem className="flex text-lg">
                        <ListIcon name="VerifiedUser" className="fill-[#34C759]" />
                        <span>
                            <b>Je kiest zelf</b> hoe je je gegevens wilt gebruiken en of je ze wel
                            of niet deelt met anderen.
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
                <Button onClick={handleClickNext} className="mb-16">
                    Volgende
                </Button>
            </section>
        </Fragment>
    );
}
