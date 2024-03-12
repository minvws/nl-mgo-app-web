import { Button, Container, Heading } from '@minvws/mgo-react-ui';
import { Link } from 'react-router-dom';
import { useNavFocusRef } from '$/lib/useNavFocusRef';
import IntroSvg from './intro.svg?react';

export function Introduction() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    return (
        <>
            <Container className="py-16" centeredContent>
                <IntroSvg />
            </Container>

            <Container className="max-w-md">
                <Heading asChild size="lg" className="mb-6">
                    <h1 ref={navFocusRef}>Je gezond&shy;heids&shy;gegevens in één overzicht</h1>
                </Heading>
                <p className="mb-12 text-lg">
                    Alle informatie die je huisarts, ziekenhuis en andere zorg&shy;verleners over
                    jou hebben. Op één plek. Veilig en overzichtelijk.
                </p>
                <Button asChild>
                    <Link to="/voorwaarden">Volgende</Link>
                </Button>
            </Container>
        </>
    );
}
