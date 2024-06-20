import { Link as UiLink } from '@minvws/mgo-mgo-ui';
import { RouterLink, type RouterLinkProps } from './RouterLink';

export type LinkProps = RouterLinkProps;

/**
 * This `Link` component combines the RouterLink functionality with the visual styles from the MGO-UI library
 */
export const Link = ({ className, ...rest }: LinkProps) => (
    <UiLink asChild className={className}>
        <RouterLink {...rest} />
    </UiLink>
);
