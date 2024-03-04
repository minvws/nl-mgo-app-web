import { Stack } from '@minvws/mgo-react-ui';
import { NavItem } from '../NavItem/NavItem';

export function DesktopMenu() {
    return (
        <nav>
            <Stack
                asChild
                className="max-h-screen w-52 flex-shrink-0 gap-3 self-stretch overflow-auto"
            >
                <ul>
                    <NavItem to="/overzicht" icon="Home">
                        Overzicht
                    </NavItem>
                    <NavItem to="/zorgverleners" icon="Favorite">
                        Zorgverleners
                    </NavItem>
                    <NavItem to="/#over-de-site" icon="QuestionMark" variant="link">
                        Over de site
                    </NavItem>
                </ul>
            </Stack>
        </nav>
    );
}
