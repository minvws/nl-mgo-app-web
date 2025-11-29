import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, Heading, Illustration, Text } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';

export function Introduction() {
    const { formatMessage } = useIntl();
    return (
        <>
            <Helmet title={formatMessage('introduction.heading')} />
            <div className="mx-auto mt-12 mb-12 flex max-w-md flex-col items-center gap-8 md:mt-16 md:mb-16 md:gap-16 lg:mt-24 lg:mb-24">
                <Illustration
                    illustration="woman-with-phone"
                    className="mx-auto max-h-[160px] w-full md:max-h-[280px]"
                />
                <div>
                    <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-6">
                        <FormattedMessage
                            id="introduction.heading"
                            description="Je gezondheidsgegevens in één overzicht"
                        />
                    </Heading>
                    <Text className="mb-6 md:mb-12" as="p">
                        <FormattedMessage
                            id="introduction.subheading"
                            description="Alle informatie die je huisarts, ziekenhuis en andere zorgverleners
                        over jou hebben. Op één plek. Veilig en overzichtelijk."
                        />
                    </Text>
                    <Button asChild>
                        <RouterLink to="/hoe-werkt-het">
                            <FormattedMessage id="common.next" />
                        </RouterLink>
                    </Button>
                </div>
            </div>
        </>
    );
}
