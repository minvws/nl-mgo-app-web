import { RouterLink } from '$/routing';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button, Container, Heading, Illustration, Text } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
    const { _ } = useLingui();
    return (
        <>
            <Helmet
                title={_(
                    msg({
                        id: 'not_found.heading',
                        message: 'Pagina niet gevonden',
                    })
                )}
            />
            <Container className="max-w-md pb-6 pt-12 md:pb-32 md:pt-24">
                <Illustration
                    className="mx-auto w-3/4 md:mb-2 md:w-3/5"
                    illustration="woman-with-umbrella"
                />
                <Heading asChild size="lg" className="mt-6 md:mt-16">
                    <h1>
                        <Trans id="not_found.heading">Pagina niet gevonden</Trans>
                    </h1>
                </Heading>
                <Text className="mt-4 md:mt-6">
                    <Trans id="not_found.subheading">
                        Sorry, we kunnen de pagina die je zocht niet vinden. Misschien is deze
                        verplaatst of verwijderd. Klik op de knop hieronder om terug te gaan naar
                        het overzicht.
                    </Trans>
                </Text>
                <Button asChild className="mt-6 md:mt-12">
                    <RouterLink to={'/overzicht'}>
                        <Trans id="not_found.to_overview">Ga naar het overzicht</Trans>
                    </RouterLink>
                </Button>
            </Container>
        </>
    );
}
