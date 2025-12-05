import { FormattedMessage } from '$/intl';
import { Link as RouterLink } from '$/routing';
import { Container, Heading, Link, List } from '@minvws/mgo-ui';
import { type HTMLAttributes } from 'react';

export type FooterProps = Omit<HTMLAttributes<HTMLElement>, 'className'>;

export function Footer(props: Readonly<FooterProps>) {
    return (
        <footer className="bg-t-cat-rijkslint md:mt-24" {...props}>
            <Container className="grid grid-cols-1 gap-6 py-6 sm:flex-row md:grid-cols-4 md:py-12">
                <nav
                    aria-labelledby="about_heading"
                    className="flex flex-col gap-3 md:col-start-3 md:gap-4"
                >
                    <Heading id="about_heading" as="h2" className="text-t-label-invert">
                        <FormattedMessage
                            id="footer.about_heading"
                            description="Over deze website"
                        />
                    </Heading>

                    <List className="gap-2 break-all">
                        <List.Item>
                            <Link href="#" variant="inverted">
                                <FormattedMessage
                                    id="footer.about_site"
                                    description="Over mijngezondheidsoverzicht.nl"
                                />
                            </Link>
                        </List.Item>
                        <List.Item>
                            <Link href="#" variant="inverted">
                                <FormattedMessage id="footer.copyright" description="Copyright" />
                            </Link>
                        </List.Item>
                        <List.Item>
                            <RouterLink to="/privacy" variant="inverted">
                                <FormattedMessage id="footer.privacy" description="Privacy" />
                            </RouterLink>
                        </List.Item>
                        <List.Item>
                            <Link href="#" variant="inverted">
                                <FormattedMessage id="footer.cookies" description="Cookies" />
                            </Link>
                        </List.Item>
                        <List.Item>
                            <Link href="#" variant="inverted">
                                <FormattedMessage
                                    id="footer.accessibility"
                                    description="Toegankelijkheid"
                                />
                            </Link>
                        </List.Item>
                    </List>
                </nav>

                <nav aria-labelledby="service_heading" className="flex flex-col gap-3 md:gap-4">
                    <Heading id="service_heading" as="h2" className="text-t-label-invert">
                        <FormattedMessage id="footer.service_heading" description="Service" />
                    </Heading>

                    <List className="gap-2 break-all">
                        <List.Item>
                            <Link href="#" variant="inverted">
                                <FormattedMessage
                                    id="footer.faq"
                                    description="Veelgestelde vragen"
                                />
                            </Link>
                        </List.Item>
                        <List.Item>
                            <Link href="#" variant="inverted">
                                <FormattedMessage id="footer.contact" description="Contact" />
                            </Link>
                        </List.Item>
                    </List>
                </nav>
            </Container>
        </footer>
    );
}
