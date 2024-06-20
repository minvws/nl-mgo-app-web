import { Link } from '$/routing';
import { Trans } from '@lingui/macro';
import { Container, List, ListIcon, ListItem, focusStyle, Heading } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {}

export function Footer(props: FooterProps) {
    return (
        <footer className="bg-white text-black dark:bg-gray-900 dark:text-white" {...props}>
            <Container className="flex flex-col justify-end gap-6 py-12 sm:flex-row">
                <nav aria-labelledby="about_title" className="flex flex-col gap-4">
                    <Heading id="about_title" asChild>
                        <h2>
                            <Trans id="footer.about.title">Over deze site</Trans>
                        </h2>
                    </Heading>

                    <List className="gap-2">
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <Trans id="footer.about.site">
                                    Over mijngezondheidsoverzicht.nl
                                </Trans>
                            </a>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <Trans id="footer.about.copyright">Copyright</Trans>
                            </a>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <Link
                                to="/privacy"
                                className="no-underline visited:text-black dark:visited:text-white"
                            >
                                <Trans id="footer.about.privacy">Privacy</Trans>
                            </Link>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <Trans id="footer.about.cookies">Cookies</Trans>
                            </a>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <Trans id="footer.about.accessibility">Toegankelijkheid</Trans>
                            </a>
                        </ListItem>
                    </List>
                </nav>
                <nav aria-labelledby="service_title" className="flex flex-col gap-4">
                    <Heading id="service_title" asChild>
                        <h2>
                            <Trans id="footer.service.title">Service</Trans>
                        </h2>
                    </Heading>
                    <List className="gap-2">
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <Trans id="footer.service.faq">Veelgestelde vragen</Trans>
                            </a>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <Trans id="footer.service.contact">Contact</Trans>
                            </a>
                        </ListItem>
                    </List>
                </nav>
            </Container>
        </footer>
    );
}
