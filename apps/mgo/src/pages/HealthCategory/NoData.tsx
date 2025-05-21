import { FormattedMessage } from '$/intl';
import { Container, Heading, Illustration, Text } from '@minvws/mgo-mgo-ui';

export function NoData() {
    return (
        <Container className="w-full max-w-full py-6 text-center">
            <Illustration className="mx-auto w-40 md:w-52" illustration="woman-with-phone" />
            <Heading asChild size="md" className="mt-8">
                <h2>
                    <FormattedMessage
                        id="health_category.empty.heading"
                        description="Geen gegevens gevonden"
                    />
                </h2>
            </Heading>
            <Text className="mt-2" variant="light">
                <FormattedMessage
                    id="health_category.empty.subheading"
                    description="Er is hier niets opgeslagen."
                />
            </Text>
        </Container>
    );
}
