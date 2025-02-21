import { FormattedMessage } from '$/intl';
import { MobileMenuItem, cn } from '@minvws/mgo-mgo-ui';
import { surfaceStyle } from '@minvws/mgo-mgo-ui/styles/surface.js';
import { forwardRef, type ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';

export type MobileMenuProps = ComponentProps<'nav'>;

export const MobileMenu = forwardRef<HTMLUListElement, MobileMenuProps>(function MobileMenu(
    { className, ...rest },
    ref
) {
    return (
        <nav className={cn(surfaceStyle, className)} ref={ref} {...rest}>
            <ul>
                <li>
                    <MobileMenuItem icon="home" asChild>
                        <NavLink to="/overzicht">
                            <FormattedMessage id="menu.overview_heading" />
                        </NavLink>
                    </MobileMenuItem>
                </li>
                <li>
                    <MobileMenuItem icon="favorite" asChild>
                        <NavLink to="/organisaties">
                            <FormattedMessage id="menu.organizations_heading" />
                        </NavLink>
                    </MobileMenuItem>
                </li>
                <li>
                    <MobileMenuItem icon="help" asChild>
                        <NavLink to="/#over-de-site">
                            <FormattedMessage id="menu.about_heading" />
                        </NavLink>
                    </MobileMenuItem>
                </li>
            </ul>
        </nav>
    );
});
