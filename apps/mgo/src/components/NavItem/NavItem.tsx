import { NavButton, type NavButtonProps } from '@minvws/mgo-mgo-ui';
import { NavLink, type NavLinkProps } from '$/routing';

export const NavItem = ({ icon, to, children, ...rest }: NavLinkProps & NavButtonProps) => (
    <li>
        <NavButton asChild className="w-full" icon={icon}>
            <NavLink to={to} {...rest}>
                {children}
            </NavLink>
        </NavButton>
    </li>
);
