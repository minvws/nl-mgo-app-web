import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef, useOrganization } from '$/hooks';
import { RouterLink } from '$/routing';
import { ButtonCard, Heading, Stack, Text } from '@minvws/mgo-mgo-ui';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { NotFound } from './NotFound';

export function Organization() {
    const { organization } = useOrganization();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const intl = useIntl();

    const i18nValues = {
        organizationName: organization?.name,
        organizationCategory: organization?.category,
    };

    if (!organization) {
        return <NotFound />;
    }

    return (
        <>
            <Helmet title={intl.formatMessage({ id: 'organization.heading' }, i18nValues)} />

            <section className="flex-grow">
                <div>
                    <BackButton />
                </div>

                <Heading asChild size="lg" className="mb-2 md:mb-4">
                    <h1 ref={navFocusRef}>
                        <FormattedMessage
                            id="organization.heading"
                            description="{organizationName}"
                            values={i18nValues}
                        />
                    </h1>
                </Heading>

                <Text asChild size="lg" className="mb-8">
                    <h2>
                        <FormattedMessage
                            id="organization.subheading"
                            description="{organizationCategory}"
                            values={i18nValues}
                        />
                    </h2>
                </Text>

                <Stack asChild className="mb-6 gap-2 md:mb-12">
                    <ul>
                        <li>
                            <ButtonCard
                                asChild
                                icon="pill"
                                title={intl.formatMessage({ id: 'organization.medicine_heading' })}
                                description={intl.formatMessage({
                                    id: 'organization.medicine_subheading',
                                })}
                            >
                                <RouterLink to={`/overzicht/${organization.slug}/medicijnen`} />
                            </ButtonCard>
                        </li>
                        <li>
                            <ButtonCard
                                asChild
                                icon="diagnosis"
                                title={intl.formatMessage({ id: 'organization.diagnosis_heading' })}
                                description={intl.formatMessage({
                                    id: 'organization.diagnosis_subheading',
                                })}
                            >
                                <RouterLink to={`/overzicht/${organization.slug}/klachten`} />
                            </ButtonCard>
                        </li>
                        <li>
                            <ButtonCard
                                asChild
                                icon="description"
                                title={intl.formatMessage({
                                    id: 'organization.lab_results_heading',
                                })}
                                description={intl.formatMessage({
                                    id: 'organization.lab_results_subheading',
                                })}
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
