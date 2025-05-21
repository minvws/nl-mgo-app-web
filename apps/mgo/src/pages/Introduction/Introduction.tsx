import { useNavFocusRef } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, Container, Heading, Illustration } from '@minvws/mgo-mgo-ui';
import { Text } from '@minvws/mgo-mgo-ui/components/Text/Text.js';
import { Helmet } from 'react-helmet-async';

export function Introduction() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    return (
        <>
            <Helmet title={formatMessage('introduction.heading')} />
            <Container className="mb-8 mt-12 md:mb-16 md:mt-16 lg:mt-24" centeredContent>
                <Illustration
                    illustration="woman-with-phone"
                    className="mx-auto max-h-[160px] w-full md:max-h-[280px]"
                />
            </Container>

            <Container className="max-w-md pb-12 md:pb-16 lg:pb-24">
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
            </Container>
        </>
    );
}
