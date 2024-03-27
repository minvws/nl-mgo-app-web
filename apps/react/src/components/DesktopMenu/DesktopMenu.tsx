import { Stack } from '@minvws/mgo-react-ui';
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
                    <NavItem to="/overzicht" icon="Home">
                        <Trans id="menu.overview">Overzicht</Trans>
                    </NavItem>
                    <NavItem to="/#over-de-site" icon="QuestionMark">
                        <Trans id="menu.about">Over de site</Trans>
                    </NavItem>
                </ul>
            </Stack>
        </nav>
    );
}
