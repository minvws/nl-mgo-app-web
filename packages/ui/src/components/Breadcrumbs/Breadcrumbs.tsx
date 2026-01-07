import type { JSX } from 'react';
import { Icon } from '../Icon/Icon';
import { Link } from '../Link/Link';
import { Text } from '../Text/Text';

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

export type BreadcrumbLinkProps = {
    children: React.ReactNode;
    href: string;
    className?: string;
};

type BreadcrumbLinkComponent = (props: BreadcrumbLinkProps) => JSX.Element;

export type BreadcrumbsProps = {
    readonly items: BreadcrumbItem[];
    readonly linkComponent?: BreadcrumbLinkComponent;
};

export function Breadcrumbs({ items, linkComponent = Link }: BreadcrumbsProps) {
    return (
        <Text as="nav">
            <ol className="flex flex-wrap items-center gap-2">
                {items.map(({ label, href }) => (
                    <li key={`${label}-${href}`} className="flex items-center gap-1">
                        {href ? (
                            <>
                                {linkComponent({
                                    children: label,
                                    href,
                                    className:
                                        'text-t-label-secondary! hover:no-underline underline break-all',
                                })}
                                <Icon
                                    icon="chevron_right"
                                    className="fill-t-label-secondary h-8 w-8 shrink-0"
                                />
                            </>
                        ) : (
                            <span>{label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </Text>
    );
}
