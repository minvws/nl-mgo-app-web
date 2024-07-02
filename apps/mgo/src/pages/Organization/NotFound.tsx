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

                <Card className="p-4 md:p-12">
                    <div className="m-0 w-full max-w-full p-0 md:mx-auto md:max-w-sm">
                        <Illustration
                            className="mx-auto w-3/4 md:w-1/2"
                            illustration="woman-with-umbrella"
                        />
                        <Heading asChild className="mt-6 md:mt-12">
                            <h1 ref={navFocusRef}>
                                <FormattedMessage
                                    id="organization.not_found_heading"
                                    description="Zorgaanbieder niet gevonden"
                                />
                            </h1>
                        </Heading>
                        <Text className="mt-2 md:mt-6">
                            <FormattedMessage
                                id="organization.not-found_subheading"
                                description="Sorry, we kunnen de zorgaanbieder die je zocht niet vinden."
                            />
                        </Text>
                        <Button asChild className="mt-4 md:mt-6">
                            <RouterLink to={'/overzicht'}>
                                <FormattedMessage
                                    id="organization.to_overview"
                                    description="Ga naar het overzicht"
                                />
                            </RouterLink>
                        </Button>
                    </div>
                </Card>
            </section>
        </>
    );
}
