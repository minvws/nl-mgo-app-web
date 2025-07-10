import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, Heading, Illustration, Text } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';

export function Introduction() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    return (
        <>
            <Helmet title={formatMessage('introduction.heading')} />
            <div className="mx-auto mb-12 mt-12 flex max-w-md flex-col items-center gap-8 md:mb-16 md:mt-16 md:gap-16 lg:mb-24 lg:mt-24">
                <Illustration
                    illustration="woman-with-phone"
                    className="mx-auto max-h-[160px] w-full md:max-h-[280px]"
                />
                <div>
                    <Heading asChild size="lg" className="mb-4 md:mb-6">
                        <h1 ref={navFocusRef}>
                            <FormattedMessage
                                id="introduction.heading"
                                description="Je gezondheidsgegevens in één overzicht"
                            />
                        </h1>
                    </Heading>
                    <Text className="mb-6 md:mb-12">
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
