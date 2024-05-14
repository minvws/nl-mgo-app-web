import { useNavFocusRef } from '$/hooks';
import { Trans } from '@lingui/macro';
import { Button, Container, Heading, Illustration } from '@minvws/mgo-mgo-ui';
import { Link } from '$/routing';

export function OnboardingIntro() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <>
            <Container className="mb-8 mt-16 md:mb-16" centeredContent>
                <Illustration
                    illustration="woman-with-phone"
                    className="mx-auto max-h-[160px] w-full md:max-h-[280px]"
                />
            </Container>

            <Container className="max-w-md">
                <Heading asChild size="lg" className="mb-6">
                    <h1 ref={navFocusRef}>
                        <Trans id="onboarding.intro.heading">
                            Je gezond&shy;heids&shy;gegevens in één overzicht
                        </Trans>
                    </h1>
                </Heading>
                <p className="text-md mb-12">
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
