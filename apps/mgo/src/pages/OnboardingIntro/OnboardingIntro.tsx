import { useNavFocusRef } from '$/hooks';
import { Trans, msg } from '@lingui/macro';
import { Button, Container, Heading, Illustration } from '@minvws/mgo-mgo-ui';
import { RouterLink } from '$/routing';
import { Text } from '../../../../../packages/mgo-ui/src/components/Text/Text';
import { Helmet } from 'react-helmet';
import { useLingui } from '@lingui/react';

export function OnboardingIntro() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <>
            <Helmet
                title={_(
                    msg({
                        id: 'onboarding.intro.title',
                        message: 'Je gezondheidsgegevens in één overzicht',
                    })
                )}
            />
            <Container className="mb-8 mt-12 md:mb-16 md:mt-16 lg:mt-24" centeredContent>
                <Illustration
                    illustration="woman-with-phone"
                    className="mx-auto max-h-[160px] w-full md:max-h-[280px]"
                />
            </Container>

            <Container className="max-w-md pb-12 md:pb-16 lg:pb-24">
                <Heading asChild size="lg" className="mb-4 md:mb-6">
                    <h1 ref={navFocusRef}>
                        <Trans id="onboarding.intro.heading">
                            Je gezond&shy;heids&shy;gegevens in één overzicht
                        </Trans>
                    </h1>
                </Heading>
                <Text className="mb-6 md:mb-12">
                    <Trans id="onboarding.intro.description">
                        Alle informatie die je huisarts, ziekenhuis en andere zorg&shy;verleners
                        over jou hebben. Op één plek. Veilig en overzichtelijk.
                    </Trans>
                </Text>
                <Button asChild>
                    <RouterLink to="/hoe-werkt-het">
                        <Trans id="common.next">Volgende</Trans>
                    </RouterLink>
                </Button>
            </Container>
        </>
    );
}
