import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Button, Container, Heading, Illustration } from '@minvws/mgo-mgo-ui';
import { RouterLink } from '$/routing';
import { Text } from '../../../../../packages/mgo-ui/src/components/Text/Text';

export function Logout() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <Container className="max-w-md pb-6 pt-12 md:pb-32 md:pt-24">
            <Illustration className="mx-auto w-3/4 md:mb-2" illustration="woman-with-phone-check" />
            <Heading asChild size="lg" className="mt-6 md:mt-16">
                <h1 ref={navFocusRef}>
                    <Trans id="logout.heading">Je bent uitgelogd</Trans>
                </h1>
            </Heading>
            <Text className="mt-4 md:mt-6">
                <Trans id="logout.subheading">
                    Wel zo fijn, zo weet je zeker dat je gegevens veilig achter slot en grendel
                    blijven.
                </Trans>
            </Text>
            <Button asChild className="mt-6 md:mt-12">
                <RouterLink to={'/inloggen'}>
                    <Trans id="logout.login">Log opnieuw in</Trans>
                </RouterLink>
            </Button>
        </Container>
    );
}
