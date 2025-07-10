import { FormattedMessage } from '$/intl';
import { Link as RouterLink } from '$/routing';
import { Container, Heading, Link, List, ListItem } from '@minvws/mgo-ui';
import { type HTMLAttributes } from 'react';

export type FooterProps = Omit<HTMLAttributes<HTMLElement>, 'className'>;

export function Footer(props: Readonly<FooterProps>) {
    return (
        <footer className="bg-lint-blue-800 dark:bg-lint-blue-300" {...props}>
            <Container className="grid grid-cols-1 gap-6 py-6 sm:flex-row md:grid-cols-4 md:py-12">
                <nav
                    aria-labelledby="about_heading"
                    className="flex flex-col gap-3 md:col-start-3 md:gap-4"
                >
                    <Heading id="about_heading" asChild className="text-white dark:text-black">
                        <h2>
                            <FormattedMessage
                                id="footer.about_heading"
                                description="Over deze website"
                            />
                        </h2>
                    </Heading>

                    <List className="gap-2 break-all text-white dark:text-black">
                        <ListItem>
                            <Link href="#" variant="monochrome">
                                <FormattedMessage
                                    id="footer.about_site"
                                    description="Over mijngezondheidsoverzicht.nl"
                                />
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="#" variant="monochrome">
                                <FormattedMessage id="footer.copyright" description="Copyright" />
                            </Link>
                        </ListItem>
                        <ListItem>
                            <RouterLink to="/privacy" variant="monochrome">
                                <FormattedMessage id="footer.privacy" description="Privacy" />
                            </RouterLink>
                        </ListItem>
                        <ListItem>
                            <Link href="#" variant="monochrome">
                                <FormattedMessage id="footer.cookies" description="Cookies" />
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="#" variant="monochrome">
                                <FormattedMessage
                                    id="footer.accessibility"
                                    description="Toegankelijkheid"
                                />
                            </Link>
                        </ListItem>
                    </List>
                </nav>

                <nav aria-labelledby="service_heading" className="flex flex-col gap-3 md:gap-4">
                    <Heading id="service_heading" asChild className="text-white dark:text-black">
                        <h2>
                            <FormattedMessage id="footer.service_heading" description="Service" />
                        </h2>
                    </Heading>

                    <List className="gap-2 break-all text-white dark:text-black">
                        <ListItem>
                            <Link href="#" variant="monochrome">
                                <FormattedMessage
                                    id="footer.faq"
                                    description="Veelgestelde vragen"
                                />
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link href="#" variant="monochrome">
                                <FormattedMessage id="footer.contact" description="Contact" />
                            </Link>
                        </ListItem>
                    </List>
                </nav>
            </Container>
        </footer>
    );
}
