import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, cn, Heading, Illustration, Text } from '@minvws/mgo-ui';
import { type HTMLAttributes } from 'react';
import { Helmet } from 'react-helmet-async';

export type NotFoundProps = HTMLAttributes<HTMLElement>;

export function NotFound({ className, ...rest }: Readonly<NotFoundProps>) {
    const { formatMessage } = useIntl();
    return (
        <>
            <Helmet title={formatMessage('not_found.heading')} />
            <div
                className={cn('mx-auto max-w-md pt-12 pb-6 md:pt-24 md:pb-32', className)}
                {...rest}
            >
                <Illustration
                    className="mx-auto w-3/4 md:mb-2 md:w-3/5"
                    illustration="woman-with-umbrella"
                />
                <Heading asChild size="xl" className="mt-6 md:mt-16">
                    <h1>
                        <FormattedMessage
                            id="not_found.heading"
                            description="Pagina niet gevonden"
                        />
                    </h1>
                </Heading>

                <Text className="mt-4 md:mt-6" as="p">
                    <FormattedMessage
                        id="not_found.subheading"
                        description="Sorry, we kunnen de pagina die je zocht niet vinden. Misschien is deze
                        verplaatst of verwijderd. Klik op de knop hieronder om terug te gaan naar
                        het overzicht."
                    />
                </Text>

                <Button asChild className="mt-6 md:mt-12">
                    <RouterLink to="/overzicht">
                        <FormattedMessage
                            id="not_found.to_overview"
                            description="Ga naar het overzicht"
                        />
                    </RouterLink>
                </Button>
            </div>
        </>
    );
}
