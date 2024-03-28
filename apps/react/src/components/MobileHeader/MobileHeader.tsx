import { Trans } from '@lingui/macro';
import { Container, twMerge } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export interface MobileHeaderProps extends HTMLAttributes<HTMLElement> {}

export function MobileHeader({ className, ...rest }: MobileHeaderProps) {
    return (
        <header
            className={twMerge(
                'border-b-solid border-b-grey-50 sticky top-0 h-16 w-full border-b bg-white shadow-sm dark:bg-[#050505]',
                className
            )}
            {...rest}
        >
            <Container className="flex h-full items-center justify-between">
                <MobileMenu />
                <h2 className="text-sm font-bold leading-none">
                    <Trans id="mobile-header.heading">Mijn Gezondheidsoverzicht</Trans>
                </h2>
                <button className="group rounded-full p-2 outline-none">
                    <span className="bg-grey-100 group-hover:bg-grey-200 flex h-8 w-8 items-center justify-center rounded-full text-sm leading-none">
                        WB
                    </span>
                </button>
            </Container>
        </header>
    );
}
