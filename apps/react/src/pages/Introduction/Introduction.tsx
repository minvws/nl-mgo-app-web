import { Button, Container, Heading } from '@minvws/mgo-react-ui';
import { useNavigate } from 'react-router-dom';
import IntroSvg from './intro.svg?react';

export function Introduction() {
    const navigate = useNavigate();
    const handleClickNext = () => {
        navigate('/voorwaarden');
    };

    return (
        <>
            <Container className="py-16" centeredContent>
                <IntroSvg />
            </Container>

            <Container className="max-w-md">
                <Heading as="h1" size="lg" className="mb-6">
                    Je gezond&shy;heids&shy;gegevens in één overzicht
                </Heading>
                <p className="mb-12 text-lg">
                    Alle informatie die je huisarts, ziekenhuis en andere zorg&shy;verleners over
                    jou hebben. Op één plek. Veilig en overzichtelijk.
                </p>
                <Button onClick={handleClickNext}>Volgende</Button>
            </Container>
        </>
    );
}
