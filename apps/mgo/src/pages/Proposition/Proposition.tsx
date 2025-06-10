import { BackButton } from '$/components/BackButton/BackButton';
import { useNavFocusRef, useOnboardingSeen } from '$/hooks';
import { FormattedMessage, useIntl } from '$/intl';
import { Link, RouterLink } from '$/routing';
import { Button, Heading, List, ListIcon, ListItem, Text } from '@minvws/mgo-ui';
import { Helmet } from 'react-helmet-async';

export function Proposition() {
    const { formatMessage } = useIntl();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const { setOnboardingSeen } = useOnboardingSeen();

    return (
        <>
            <Helmet title={formatMessage('proposition.heading')} />

            <section className="flex-grow">
                <BackButton />

                <div className="mx-auto mb-12 max-w-md md:mb-16 lg:mb-24">
                    <Heading asChild size="lg" className="mb-4 md:mb-6">
                        <h1 ref={navFocusRef}>
                            <FormattedMessage
                                id="proposition.heading"
                                description="Zo gebruikt de website jouw gegevens"
                            />
                        </h1>
                    </Heading>

                    <Text className="mb-6 md:mb-12">
                        <FormattedMessage
                            id="proposition.subheading"
                            description="In de <a>privacyverklaring</a> staat hoe Mijn Gezondheidsoverzicht jouw gegevens gebruikt. Dit zijn de belangrijkste punten"
                            values={{
                                /* c8 ignore next, values may not be used in the actual copy */
                                a: (chunks) => <Link to="/privacy">{chunks}</Link>,
                            }}
                        />
                    </Text>

                    <Text asChild>
                        <List className="mb-12">
                            <ListItem className="flex">
                                <ListIcon icon="encrypted" className="fill-[#34C759]" />
                                <span>
                                    <FormattedMessage id="proposition.statement_1" />
                                </span>
                            </ListItem>
                            <ListItem className="flex">
                                <ListIcon icon="health-and-safety" className="fill-[#34C759]" />
                                <span>
                                    <FormattedMessage id="proposition.statement_2" />
                                </span>
                            </ListItem>
                            <ListItem className="flex">
                                <ListIcon icon="verified-user" className="fill-[#34C759]" />
                                <span>
                                    <FormattedMessage id="proposition.statement_3" />
                                </span>
                            </ListItem>
                            <ListItem className="flex">
                                <ListIcon icon="gpp-bad" className="fill-[#34C759]" />
                                <span>
                                    <FormattedMessage id="proposition.statement_4" />
                                </span>
                            </ListItem>
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
