import { BackButton } from '$/components/BackButton/BackButton';
import { useOnboardingSeen } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { Link, RouterLink } from '$/routing';
import { Button, Heading, List, Text } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';

export function Proposition() {
    const { formatMessage } = useIntl();
    const { setOnboardingSeen } = useOnboardingSeen();

    return (
        <>
            <Helmet title={formatMessage('proposition.heading')} />

            <section className="grow">
                <BackButton />

                <div className="mx-auto mb-12 max-w-md md:mb-16 lg:mb-24">
                    <Heading as="h1" focusOnRender size="xl" className="mb-4 md:mb-6">
                        <FormattedMessage
                            id="proposition.heading"
                            description="Zo gebruikt de website jouw gegevens"
                        />
                    </Heading>

                    <Text className="mb-6 md:mb-12" as="p">
                        <FormattedMessage
                            id="proposition.subheading"
                            description="In de <a>privacyverklaring</a> staat hoe Mijn Gezondheidsoverzicht jouw gegevens gebruikt. Dit zijn de belangrijkste punten"
                            values={{
                                /* c8 ignore next, values may not be used in the actual copy */ // eslint-disable-next-line react/no-unstable-nested-components
                                a: (chunks) => <Link to="/privacy">{chunks}</Link>,
                            }}
                        />
                    </Text>

                    <Text asChild>
                        <List className="mb-12">
                            <List.Item className="flex">
                                <List.Icon icon="encrypted" className="text-t-state-informative" />
                                <span>
                                    <FormattedMessage id="proposition.statement_1" />
                                </span>
                            </List.Item>
                            <List.Item className="flex">
                                <List.Icon
                                    icon="health_and_safety"
                                    className="text-t-state-informative"
                                />
                                <span>
                                    <FormattedMessage id="proposition.statement_2" />
                                </span>
                            </List.Item>
                            <List.Item className="flex">
                                <List.Icon
                                    icon="verified_user"
                                    className="text-t-state-informative"
                                />
                                <span>
                                    <FormattedMessage id="proposition.statement_3" />
                                </span>
                            </List.Item>
                            <List.Item className="flex">
                                <List.Icon icon="gpp_bad" className="text-t-state-informative" />
                                <span>
                                    <FormattedMessage id="proposition.statement_4" />
                                </span>
                            </List.Item>
                        </List>
                    </Text>

                    <Button asChild onClick={() => setOnboardingSeen()}>
                        <RouterLink to="/zorgaanbieder-toevoegen">
                            <FormattedMessage id="common.next" description="Volgende" />
                        </RouterLink>
                    </Button>
                </div>
            </section>
        </>
    );
}
