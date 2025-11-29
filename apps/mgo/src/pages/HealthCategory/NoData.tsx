import { FormattedMessage } from '$/intl';
import { Heading, Illustration, Text } from '@minvws/mgo-ui';

export function NoData() {
    return (
        <div className="w-full py-6 text-center">
            <Illustration className="mx-auto w-40 md:w-52" illustration="woman-with-phone" />
            <Heading asChild size="md" className="mt-8">
                <h2>
                    <FormattedMessage
                        id="health_category.empty.heading"
                        description="Geen gegevens gevonden"
                    />
                </h2>
            </Heading>
            <Text className="text-t-label-secondary mt-2" as="p">
                <FormattedMessage
                    id="health_category.empty.subheading"
                    description="Er is hier niets opgeslagen."
                />
            </Text>
        </div>
    );
}
