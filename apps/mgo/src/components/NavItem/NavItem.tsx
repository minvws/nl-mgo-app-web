import { NavButton, type NavButtonProps } from '@minvws/mgo-mgo-ui';
import { RouterNavLink, type RouterNavLinkProps } from '$/routing';

export const NavItem = ({ icon, to, children, ...rest }: RouterNavLinkProps & NavButtonProps) => (
    <li>
        <NavButton asChild className="w-full" icon={icon}>
            <RouterNavLink to={to} {...rest}>
                {children}
            </RouterNavLink>
        </NavButton>
    </li>
);
