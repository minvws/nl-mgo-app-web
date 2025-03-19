import { RouterNavLink, type RouterNavLinkProps } from '$/routing';
import { NavButton, type NavButtonProps } from '@minvws/mgo-mgo-ui';

export const NavItem = ({ icon, to, children, ...rest }: RouterNavLinkProps & NavButtonProps) => {
    return (
        <NavButton asChild className="w-full" icon={icon}>
            <RouterNavLink to={to} {...rest}>
                {children}
            </RouterNavLink>
        </NavButton>
    );
};
