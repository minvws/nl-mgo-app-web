import { routes } from '$/routing/routes';
import { cn, Icon, Text, tw } from '@minvws/mgo-ui';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from './useBreadcrumbs';

export function Breadcrumbs() {
    const crumbs = useBreadcrumbs(routes);

    if (crumbs.length === 0) return null;

    return (
        <Text as="nav">
            <ol className="flex items-center gap-2">
                {crumbs.map((crumb, index: number) => {
                    const isLast = index === crumbs.length - 1;

                    return (
                        <li key={crumb.href} className="flex items-center gap-1">
                            {isLast ? (
                                <span>{crumb.label}</span>
                            ) : (
                                <>
                                    <Link
                                        to={crumb.href}
                                        className={cn(
                                            tw`text-t-label-secondary hover:no-underline`,
                                            'underline'
                                        )}
                                    >
                                        {crumb.label}
                                    </Link>
                                    <Icon
                                        icon="chevron_right"
                                        className="fill-t-label-secondary h-8 w-8 shrink-0"
                                    />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </Text>
    );
}
