import { Stack } from '@minvws/mgo-mgo-ui';
import { NavItem } from '../NavItem/NavItem';
import { Trans } from '@lingui/macro';

export function DesktopMenu() {
    return (
        <nav data-testid="menu-desktop">
            <Stack asChild className="max-h-screen w-52 flex-shrink-0 gap-3 self-stretch">
                <ul>
                    <NavItem to="/overzicht" icon="home">
                        <Trans id="menu.overview_heading">Overzicht</Trans>
                    </NavItem>
                    <NavItem to="/#over-de-site" icon="question-mark">
                        <Trans id="menu.about_heading">Over de site</Trans>
                    </NavItem>
                </ul>
            </Stack>
        </nav>
    );
}
