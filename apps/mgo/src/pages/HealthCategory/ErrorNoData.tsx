import { FormattedMessage } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, Heading, Icon, Text } from '@minvws/mgo-ui';

export function ErrorNoData() {
    return (
        <div className="w-full py-6 text-center">
            <Icon className="mx-auto h-12 w-12" icon={'sync_problem'} />
            <Heading as="h2" size="sm" className="mt-8">
                <FormattedMessage
                    id="health_category.errornodata.heading"
                    description="Geen gegevens opgehaald"
                />
            </Heading>
            <Text className="text-t-label-secondary mt-2" as="p">
                <FormattedMessage
                    id="health_category.errornodata.subheading"
                    description="Dit komt door een storing bij ons. Probeer het later opnieuw."
                />
            </Text>

            <Button className="mt-6">
                <RouterLink to="/overzicht">
                    <FormattedMessage id="common.try_again" description="Ga naar overzicht" />
                </RouterLink>
            </Button>
        </div>
    );
}
