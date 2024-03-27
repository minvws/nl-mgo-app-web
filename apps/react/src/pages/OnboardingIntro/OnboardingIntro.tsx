import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Button, Container, Heading } from '@minvws/mgo-react-ui';
import { Link } from '$/routing';
import IntroSvg from './intro.svg?react';

export function OnboardingIntro() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <>
            <Container className="py-16" centeredContent>
                <IntroSvg />
            </Container>

            <Container className="max-w-md">
                <Heading asChild size="lg" className="mb-6">
                    <h1 ref={navFocusRef}>
                        <Trans id="onboarding.intro.heading">
                            Je gezond&shy;heids&shy;gegevens in één overzicht
                        </Trans>
                    </h1>
                </Heading>
                <p className="mb-12 text-lg">
                    <Trans id="onboarding.intro.description">
                        Alle informatie die je huisarts, ziekenhuis en andere zorg&shy;verleners
                        over jou hebben. Op één plek. Veilig en overzichtelijk.
                    </Trans>
                </p>
                <Button asChild>
                    <Link to="/hoe-werkt-het">
                        <Trans id="common.next">Volgende</Trans>
                    </Link>
                </Button>
            </Container>
        </>
    );
}
