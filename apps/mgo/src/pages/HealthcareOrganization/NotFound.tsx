import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks';
import { Link } from '$/routing';
import { Trans } from '@lingui/macro';
import { Button, Card, Heading, Illustration, Text } from '@minvws/mgo-mgo-ui';

export function NotFound() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <section className="flex-grow">
            <div>
                <BackButton />
            </div>

            <Card className="p-4 md:p-12">
                <div className="m-0 w-full max-w-full p-0 md:mx-auto md:max-w-sm">
                    <Illustration
                        className="mx-auto w-3/4 md:w-1/2"
                        illustration="woman-with-umbrella"
                    />
                    <Heading asChild className="mt-6 md:mt-12">
                        <h1 ref={navFocusRef}>
                            <Trans id="healthcare-provider.not-found.heading">
                                Zorgaanbieder niet gevonden
                            </Trans>
                        </h1>
                    </Heading>
                    <Text className="mt-2 md:mt-6">
                        <Trans id="healthcare-provider.not-found.description">
                            Sorry, we kunnen de zorgaanbieder die je zocht niet vinden. Misschien is
                            deze verwijderd. Klik op de knop hieronder om terug te gaan naar het
                            overzicht.
                        </Trans>
                    </Text>
                    <Button asChild className="mt-4 md:mt-6">
                        <Link to={'/overzicht'}>
                            <Trans id="healthcare-provider.not-found.button">
                                Ga naar het overzicht
                            </Trans>
                        </Link>
                    </Button>
                </div>
            </Card>
        </section>
    );
}
