import { Link as UiLink, type LinkProps as UiLinkProps } from '@minvws/mgo-mgo-ui';
import { RouterLink, type RouterLinkProps } from './RouterLink';

export type LinkProps = RouterLinkProps & Pick<UiLinkProps, 'variant'>;

/**
 * This `Link` component combines the RouterLink functionality with the visual styles from the MGO-UI library
 */
export const Link = ({ variant, className, ...rest }: LinkProps) => (
    <UiLink asChild variant={variant} className={className}>
        <RouterLink {...rest} />
    </UiLink>
);
