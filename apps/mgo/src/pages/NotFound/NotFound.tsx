import { Link } from '$/routing';
import { Trans } from '@lingui/macro';
import { Button, Container, Heading, Illustration, Text } from '@minvws/mgo-mgo-ui';

export function NotFound() {
    return (
        <Container className="max-w-md pb-6 pt-12 md:pb-32 md:pt-24">
            <Illustration
                className="mx-auto w-3/4 md:mb-2 md:w-3/5"
                illustration="woman-with-umbrella"
            />
            <Heading asChild size="lg" className="mt-6 md:mt-16">
                <h1>
                    <Trans id="not-found.heading">Pagina niet gevonden</Trans>
                </h1>
            </Heading>
            <Text className="mt-4 md:mt-6">
                <Trans id="not-found.description">
                    Sorry, we kunnen de pagina die je zocht niet vinden. Misschien is deze
                    verplaatst of verwijderd. Klik op de knop hieronder om terug te gaan naar het
                    overzicht.
                </Trans>
            </Text>
            <Button asChild className="mt-6 md:mt-12">
                <Link to={'/overzicht'}>
                    <Trans id="not-found.button">Ga naar het overzicht</Trans>
                </Link>
            </Button>
        </Container>
    );
}
