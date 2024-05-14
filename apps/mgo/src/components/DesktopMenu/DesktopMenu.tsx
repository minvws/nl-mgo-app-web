import { Stack } from '@minvws/mgo-mgo-ui';
import { NavItem } from '../NavItem/NavItem';
import { Trans } from '@lingui/macro';

export function DesktopMenu() {
    return (
        <nav>
            <Stack
                asChild
                className="max-h-screen w-52 flex-shrink-0 gap-3 self-stretch overflow-auto"
            >
                <ul>
                    <NavItem to="/overzicht" icon="home">
                        <Trans id="menu.overview">Overzicht</Trans>
                    </NavItem>
                    <NavItem to="/#over-de-site" icon="question-mark">
                        <Trans id="menu.about">Over de site</Trans>
                    </NavItem>
                </ul>
            </Stack>
        </nav>
    );
}
