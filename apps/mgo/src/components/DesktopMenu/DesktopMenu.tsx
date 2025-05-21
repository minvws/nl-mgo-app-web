import { FormattedMessage } from '$/intl';
import { Stack } from '@minvws/mgo-mgo-ui';
import { NavItem } from '../NavItem/NavItem';

export function DesktopMenu() {
    return (
        <nav data-testid="menu-desktop">
            <Stack asChild className="sticky top-8 w-52 gap-3 md:top-10 lg:top-12">
                <ul>
                    <li>
                        <NavItem to="/overzicht" icon="home">
                            <FormattedMessage id="menu.overview_heading" description="Overzicht" />
                        </NavItem>
                    </li>
                    <li>
                        <NavItem to="/organisaties" icon="favorite">
                            <FormattedMessage
                                id="menu.organizations_heading"
                                description="Zorgaanbieders"
                            />
                        </NavItem>
                    </li>
                </ul>
            </Stack>
        </nav>
    );
}
