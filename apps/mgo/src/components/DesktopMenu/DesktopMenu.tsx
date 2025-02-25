import { FormattedMessage } from '$/intl';
import { Stack } from '@minvws/mgo-mgo-ui';
import { NavItem } from '../NavItem/NavItem';

export function DesktopMenu() {
    return (
        <nav data-testid="menu-desktop">
            <Stack asChild className="max-h-screen w-52 flex-shrink-0 gap-3 self-stretch">
                <ul>
                    <NavItem to="/overzicht" icon="home">
                        <FormattedMessage id="menu.overview_heading" description="Overzicht" />
                    </NavItem>
                    <NavItem to="/organisaties" icon="favorite">
                        <FormattedMessage
                            id="menu.organizations_heading"
                            description="Zorgaanbieders"
                        />
                    </NavItem>
                    <NavItem to="/#over-de-site" icon="question-mark">
                        <FormattedMessage id="menu.about_heading" description="Over de site" />
                    </NavItem>
                </ul>
            </Stack>
        </nav>
    );
}
