import { routes } from '$/routing/routes';
import { cn, Icon, tw } from '@minvws/mgo-ui';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from './useBreadcrumbs';

export function Breadcrumbs() {
    const crumbs = useBreadcrumbs(routes);

    if (crumbs.length === 0) return null;

    return (
        <nav>
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
                                            tw`text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`,
                                            'underline'
                                        )}
                                    >
                                        {crumb.label}
                                    </Link>
                                    <Icon
                                        icon="chevron-right"
                                        className="h-8 w-8 flex-shrink-0 fill-gray-500"
                                    />
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
