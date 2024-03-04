import { NavButton, type NavButtonProps } from '@minvws/mgo-react-ui';
import { NavLink, type NavLinkProps } from 'react-router-dom';

export const NavItem = ({
    variant = 'solid',
    icon,
    to,
    children,
    ...rest
}: NavLinkProps & NavButtonProps) => (
    <li>
        <NavButton asChild className="w-full" variant={variant} icon={icon}>
            <NavLink to={to} {...rest}>
                {children}
            </NavLink>
        </NavButton>
    </li>
);
