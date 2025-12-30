import { routes } from '$/routing/routes';
import { BreadcrumbLinkProps, Breadcrumbs as BreadcrumbsComponent } from '@minvws/mgo-ui';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from './useBreadcrumbs';

const LinkComponent = ({ children, href, className }: BreadcrumbLinkProps) => (
    <Link to={href} className={className}>
        {children}
    </Link>
);

export function Breadcrumbs() {
    const allCrumbs = useBreadcrumbs(routes);

    if (allCrumbs.length === 0) {
        return null;
    }

    const crumbs = allCrumbs.map((crumb, index) => {
        const isLast = index === allCrumbs.length - 1;
        return {
            label: crumb.label,
            href: isLast ? undefined : crumb.href,
        };
    });

    return <BreadcrumbsComponent items={crumbs} linkComponent={LinkComponent} />;
}
