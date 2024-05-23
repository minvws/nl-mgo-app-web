import { useNavFocusRef } from '$/hooks';
import { Link, useParams } from '$/routing';
import { useHealthcareOrganizationsStore } from '$/store';
import { Trans, msg } from '@lingui/macro';
import { ButtonCard, Heading, Stack, Text } from '@minvws/mgo-mgo-ui';
import { NotFound } from './NotFound';
import { useLingui } from '@lingui/react';
import { BackButton } from '$/components/BackButton/BackButton';

export function HealthcareOrganization() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { healthcareOrganizationSlug } = useParams();
    const { getHealthcareOrganization } = useHealthcareOrganizationsStore();
    const { _ } = useLingui();

    const healthcareProvider = getHealthcareOrganization(healthcareOrganizationSlug);

    if (!healthcareProvider) {
        return <NotFound />;
    }

    const { display_name } = healthcareProvider;

    return (
        <section className="flex-grow">
            <div>
                <BackButton />
            </div>

            <Heading asChild size="lg" className="mb-2 md:mb-4">
                <h1 ref={navFocusRef}>{display_name}</h1>
            </Heading>

            <Text asChild size="lg" className="mb-8">
                <h2>
                    <Trans id="common.hospital">Ziekenhuis</Trans>
                </h2>
            </Text>

            <Stack asChild className="mb-6 gap-2 md:mb-12">
                <ul>
                    <li>
                        <ButtonCard
                            asChild
                            icon="pill"
                            title={_(
                                msg({
                                    id: 'healthcare-provider.medicine.title',
                                    message: 'Medicijnen',
                                })
                            )}
                            description={_(
                                msg({
                                    id: 'healthcare-provider.medicine.description',
                                    message: 'Voorgeschreven door je zorgaanbieder',
                                })
                            )}
                        >
                            <Link to={`/overzicht/${healthcareOrganizationSlug}/medicijnen`} />
                        </ButtonCard>
                    </li>
                    <li>
                        <ButtonCard
                            asChild
                            icon="diagnosis"
                            title={_(
                                msg({
                                    id: 'healthcare-provider.diagnosis.title',
                                    message: 'Klachten en diagnoses',
                                })
                            )}
                            description={_(
                                msg({
                                    id: 'healthcare-provider.diagnosis.description',
                                    message: `Vastgesteld door je zorgaanbieder`,
                                })
                            )}
                        >
                            <Link to="#diagnoses" />
                        </ButtonCard>
                    </li>
                    <li>
                        <ButtonCard
                            asChild
                            icon="description"
                            title={_(
                                msg({
                                    id: 'healthcare-provider.reports.title',
                                    message: 'Verslagen',
                                })
                            )}
                            description={_(
                                msg({
                                    id: 'healthcare-provider.reports.description',
                                    message: `Rapporten en verslagen die zijn opgesteld door je zorgaanbieders`,
                                })
                            )}
                        >
                            <Link to="#verslagen" />
                        </ButtonCard>
                    </li>
                </ul>
            </Stack>
        </section>
    );
}
