import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Heading } from '@minvws/mgo-react-ui';
import IntroSvg from './intro.svg?react';

export function Introduction() {
    const navigate = useNavigate();
    const handleClickNext = () => {
        navigate('/voorwaarden');
    };

    return (
        <Fragment>
            <section className="mx-auto max-w-2xl">
                <IntroSvg className="mb-16 w-full" />
                <Heading as="h1" size="lg" className="mb-6">
                    Je gezond&shy;heids&shy;gegevens in één overzicht
                </Heading>
                <p className="mb-12 text-lg">
                    Alle informatie die je huisarts, ziekenhuis en andere zorg&shy;verleners over
                    jou hebben. Op één plek. Veilig en overzichtelijk.
                </p>
                <Button onClick={handleClickNext} className="mb-16">
                    Volgende
                </Button>
            </section>
        </Fragment>
    );
}
