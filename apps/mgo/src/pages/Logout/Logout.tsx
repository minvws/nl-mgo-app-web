import { useNavFocusRef } from '$/hooks';
import { FormattedMessage } from '$/intl';
import { RouterLink } from '$/routing';
import { Button, Container, Heading, Illustration } from '@minvws/mgo-mgo-ui';
import { Text } from '../../../../../packages/mgo-ui/src/components/Text/Text';

export function Logout() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <Container className="max-w-md pb-6 pt-12 md:pb-32 md:pt-24">
            <Illustration className="mx-auto w-3/4 md:mb-2" illustration="woman-with-phone-check" />
            <Heading asChild size="lg" className="mt-6 md:mt-16">
                <h1 ref={navFocusRef}>
                    <FormattedMessage id="logout.heading" description="Je bent uitgelogd" />
                </h1>
            </Heading>
            <Text className="mt-4 md:mt-6">
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
        </Container>
    );
}
