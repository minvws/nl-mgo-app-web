import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef } from '$/hooks';
import { Link } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
    Button,
    Container,
    Heading,
    HealthcareOrganizationButton,
    Stack,
} from '@minvws/mgo-react-ui';

export function AddHealthcareOrganizationList() {
    const { _ } = useLingui();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    const { healthcareOrganizations, removeHealthcareOrganization } =
        useHealthcareOrganizationsStore();

    return (
        <div className="flex flex-grow flex-col">
            <Container>
                <BackButton />
            </Container>

            <Container className="max-w-md">
                <Heading asChild size="lg" className="mb-6">
                    <h1 ref={navFocusRef}>
                        <Trans id="healthcare-providers.heading">
                            Welke zorgaanbieders wil je op je overzicht tonen?
                        </Trans>
                    </h1>
                </Heading>
                <p className="text-xl">
                    <Trans id="healthcare-providers.description">
                        Je kunt deze lijst nu aanpassen of dit later in je profiel doen.
                    </Trans>
                </p>
            </Container>

            <Container className="flex max-w-md flex-grow">
                <Stack className="my-6 flex-grow gap-12 md:my-12">
                    <Stack asChild className="gap-2 sm:gap-4">
                        <ul>
                            {healthcareOrganizations.map(
                                ({ slug, display_name, types, addresses }) => (
                                    <li key={slug}>
                                        <HealthcareOrganizationButton
                                            onClick={() => removeHealthcareOrganization(slug)}
                                            className="w-full"
                                            title={types[0].display_name}
                                            subTitle={display_name}
                                            meta={
                                                <span className="whitespace-pre">
                                                    {addresses[0].address}
                                                </span>
                                            }
                                            icon="delete"
                                            iconAriaLabel={_(
                                                msg({
                                                    id: 'healthcare-providers.delete',
                                                    message: 'verwijderen',
                                                })
                                            )}
                                        />
                                    </li>
                                )
                            )}
                        </ul>
                    </Stack>
                    <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-6">
                        <Button asChild>
                            <Link to="/overzicht">
                                <Trans id="healthcare-providers.done">Klaar</Trans>
                            </Link>
                        </Button>
                        <Button variant="light" asChild>
                            <Link to="/zorgaanbieder-toevoegen">
                                <Trans id="healthcare-providers.add">
                                    Voeg een zorgaanbieder toe
                                </Trans>
                            </Link>
                        </Button>
                    </div>
                </Stack>
            </Container>
        </div>
    );
}
