import { cn } from '@minvws/mgo-mgo-ui';
import { useEffect, useRef, type HTMLAttributes } from 'react';

export interface StickyHeaderProps extends HTMLAttributes<HTMLElement> {
    readonly menuIsOpen: boolean;
}

export function StickyHeader({ menuIsOpen, children, className, ...rest }: StickyHeaderProps) {
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!menuIsOpen || !headerRef.current) return;
        const { top } = headerRef.current.getBoundingClientRect();
        if (top > 0) {
            window.scrollTo({
                top: top + document.documentElement.scrollTop,
                behavior: 'smooth',
            });
        }
    }, [menuIsOpen, headerRef]);

    return (
        <header ref={headerRef} className={cn('sticky top-0 z-30 w-full', className)} {...rest}>
            {children}
        </header>
    );
}
