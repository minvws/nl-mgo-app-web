import { Trans } from '@lingui/macro';
import { Button, Container, cn } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';

export interface DesktopHeaderProps extends HTMLAttributes<HTMLElement> {}

export function DesktopHeader({ className, ...rest }: DesktopHeaderProps) {
    return (
        <header
            className={cn(
                'border-b-solid border-b border-b-gray-50 bg-white dark:border-b-gray-900 dark:bg-black',
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
