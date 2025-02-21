import { FormattedMessage } from '$/intl';
import { Link } from '$/routing';
import { Container, Heading, List, ListIcon, ListItem, focusStyle } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {}

export function Footer(props: FooterProps) {
    return (
        <footer className="bg-white text-black dark:bg-gray-900 dark:text-white" {...props}>
            <Container className="flex flex-col justify-end gap-6 py-12 sm:flex-row">
                <nav aria-labelledby="about_heading" className="flex flex-col gap-4">
                    <Heading id="about_heading" asChild>
                        <h2>
                            <FormattedMessage
                                id="footer.about_heading"
                                description="Over deze site"
                            />
                        </h2>
                    </Heading>

                    <List className="gap-2">
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <FormattedMessage
                                    id="footer.about_site"
                                    description="Over mijngezondheidsoverzicht.nl"
                                />
                            </a>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <FormattedMessage id="footer.copyright" description="Copyright" />
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
                                <FormattedMessage id="footer.privacy" description="Privacy" />
                            </Link>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <FormattedMessage id="footer.cookies" description="Cookies" />
                            </a>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <FormattedMessage
                                    id="footer.accessibility"
                                    description="Toegankelijkheid"
                                />
                            </a>
                        </ListItem>
                    </List>
                </nav>

                <nav aria-labelledby="service_heading" className="flex flex-col gap-4">
                    <Heading id="service_heading" asChild>
                        <h2>
                            <FormattedMessage id="footer.service_heading" description="Service" />
                        </h2>
                    </Heading>
                    <List className="gap-2">
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <FormattedMessage
                                    id="footer.faq"
                                    description="Veelgestelde vragen"
                                />
                            </a>
                        </ListItem>
                        <ListItem className="text-md flex items-center">
                            <ListIcon
                                icon="chevron-right-fat"
                                className="fill-dark-blue-700 me-2 h-3 w-3"
                            />
                            <a href="#" className={focusStyle}>
                                <FormattedMessage id="footer.contact" description="Contact" />
                            </a>
                        </ListItem>
                    </List>
                </nav>
            </Container>
        </footer>
    );
}
