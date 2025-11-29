import { FormattedMessage } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, Heading, Illustration, Text } from '@minvws/mgo-ui';

export function Logout() {
    return (
        <div className="mx-auto max-w-md pt-12 pb-6 md:pt-24 md:pb-32">
            <Illustration className="mx-auto w-3/4 md:mb-2" illustration="woman-with-phone-check" />
            <Heading as="h1" focusOnRender size="xl" className="mt-6 md:mt-16">
                <FormattedMessage id="logout.heading" description="Je bent uitgelogd" />
            </Heading>
            <Text className="mt-4 md:mt-6" as="p">
                <FormattedMessage
                    id="logout.subheading"
                    description="Wel zo fijn, zo weet je zeker dat je gegevens veilig achter slot en grendel
                    blijven."
                />
            </Text>
            <Button asChild className="mt-6 md:mt-12">
                <RouterLink to={'/inloggen'}>
                    <FormattedMessage id="logout.login" description="Log opnieuw in" />
                </RouterLink>
            </Button>
        </div>
    );
}
