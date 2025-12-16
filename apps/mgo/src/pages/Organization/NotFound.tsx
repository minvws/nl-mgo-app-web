import { BackButton } from '$/components/BackButton/BackButton';
import { RouterLink } from '$/routing';

import { FormattedMessage, useIntl } from '$/intl';
import { Button, Card, Heading, Text } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
    const { formatMessage } = useIntl();

    return (
        <>
            <Helmet title={formatMessage('organization.not_found_heading')} />
            <section className="grow">
                <div>
                    <BackButton />
                </div>

                <Heading as="h1" focusOnRender size="xl" className="mb-6 md:mb-12">
                    <FormattedMessage
                        id="organization.not_found_heading"
                        description="Zorgaanbieder niet gevonden"
                    />
                </Heading>

                <Card className="p-4 md:p-12">
                    <Text className="mt-6 md:mt-12" as="p">
                        <FormattedMessage
                            id="organization.not-found_subheading"
                            description="Misschien is de zorgaanbieder die je zoekt verwijderd. Klik op de knop hieronder om terug te gaan naar het overzicht."
                        />
                    </Text>
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
