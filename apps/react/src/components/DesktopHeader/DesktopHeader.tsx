import { Trans } from '@lingui/macro';
import { Button, Container, twMerge } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';

export interface DesktopHeaderProps extends HTMLAttributes<HTMLElement> {}

export function DesktopHeader({ className, ...rest }: DesktopHeaderProps) {
    return (
        <header
            className={twMerge(
                'border-b-solid border-b border-b-gray-50 bg-white dark:bg-[#050505]',
                className
            )}
            {...rest}
        >
            <Container className="flex items-center justify-between py-4">
                <h2 className="text-xl font-normal leading-tight text-black">
                    <Trans id="desktop-header.heading">Mijn Gezondheidsoverzicht</Trans>
                </h2>
                <Button
                    className="text-black dark:text-white"
                    leftIcon="person"
                    rightIcon="expand-more"
                    variant="ghost"
                >
                    Wendy de Bruijn
                </Button>
            </Container>
        </header>
    );
}
