import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks';
import { RouterLink } from '$/routing';

import { Button, Card, Heading, Illustration, Text } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

export function NotFound() {
    const intl = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <>
            <Helmet title={intl.formatMessage({ id: 'organization.not_found_heading' })} />
            <section className="flex-grow">
                <div>
                    <BackButton />
                </div>

                <Heading asChild size="lg" className="mb-6 md:mb-12">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage
                            id="organization.not_found_heading"
                            description="Zorgaanbieder niet gevonden"
                        />
                    </h1>
                </Heading>

                <Card className="p-4 md:p-12">
                    <div className="m-0 w-full max-w-full p-0 md:mx-auto md:max-w-sm">
                        <Illustration
                            className="mx-auto w-3/4 md:w-1/2"
                            illustration="woman-with-umbrella"
                        />
                        <Text className="mt-6 md:mt-12">
                            <FormattedMessage
                                id="organization.not-found_subheading"
                                description="Misschien is de zorgaanbieder die je zoekt verwijderd. Klik op de knop hieronder om terug te gaan naar het overzicht."
                            />
                        </Text>
                    </div>
                </Card>
                <Button asChild className="mt-6 md:mt-12">
                    <RouterLink to={'/overzicht'}>
                        <FormattedMessage
                            id="organization.to_overview"
                            description="Ga naar het overzicht"
                        />
                    </RouterLink>
                </Button>
            </section>
        </>
    );
}
