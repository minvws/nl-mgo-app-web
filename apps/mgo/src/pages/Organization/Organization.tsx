import { BackButton } from '$/components/BackButton/BackButton';
import { useOrganization, useNavFocusRef } from '$/hooks';
import { RouterLink } from '$/routing';
import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ButtonCard, Heading, Stack, Text } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { NotFound } from './NotFound';

export function Organization() {
    const { organization } = useOrganization();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { _ } = useLingui();
    const organizationName = organization?.name;
    const organizationCategory = organization?.category;

    if (!organization) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet
                title={_(
                    msg({
                        id: 'organization.heading',
                        message: `${organizationName}`,
                    })
                )}
            />
            <section className="flex-grow">
                <div>
                    <BackButton />
                </div>

                <Heading asChild size="lg" className="mb-2 md:mb-4">
                    <h1 ref={navFocusRef}>
                        <Trans id="organization.heading">{organizationName}</Trans>
                    </h1>
                </Heading>

                <Text asChild size="lg" className="mb-8">
                    <h2>
                        <Trans id="organization.subheading">{organizationCategory}</Trans>
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
                                        id: 'organization.medicine_heading',
                                        message: 'Medicijnen',
                                    })
                                )}
                                description={_(
                                    msg({
                                        id: 'organization.medicine_subheading',
                                        message: 'Voorgeschreven door je zorgaanbieder',
                                    })
                                )}
                            >
                                <RouterLink to={`/overzicht/${organization.slug}/medicijnen`} />
                            </ButtonCard>
                        </li>
                        <li>
                            <ButtonCard
                                asChild
                                icon="diagnosis"
                                title={_(
                                    msg({
                                        id: 'organization.diagnosis_heading',
                                        message: 'Klachten en diagnoses',
                                    })
                                )}
                                description={_(
                                    msg({
                                        id: 'organization.diagnosis_subheading',
                                        message: `Vastgesteld door je zorgaanbieder`,
                                    })
                                )}
                            >
                                <RouterLink to={`/overzicht/${organization.slug}/klachten`} />
                            </ButtonCard>
                        </li>
                        <li>
                            <ButtonCard
                                asChild
                                icon="description"
                                title={_(
                                    msg({
                                        id: 'organization.lab_results_heading',
                                        message: 'Uitslagen',
                                    })
                                )}
                                description={_(
                                    msg({
                                        id: 'organization.lab_results_subheading',
                                        message: `Resultaten van jouw onderzoeken, (röntgen)foto's en scans`,
                                    })
                                )}
                            >
                                <RouterLink to={`/overzicht/${organization.slug}/uitslagen`} />
                            </ButtonCard>
                        </li>
                    </ul>
                </Stack>
            </section>
        </>
    );
}
