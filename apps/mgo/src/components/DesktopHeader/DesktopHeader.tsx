import { useAuth } from '$/lib/auth';
import { Trans } from '@lingui/macro';
import { Button, Container, cn } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';

export interface DesktopHeaderProps extends HTMLAttributes<HTMLElement> {}

export function DesktopHeader({ className, ...rest }: DesktopHeaderProps) {
    const auth = useAuth();

    return (
        <header data-testid="header-desktop" className={cn(className)} {...rest}>
            <Container className="flex items-center justify-between py-4">
                <h2 className="text-xl font-normal leading-tight text-black dark:text-white">
                    <Trans id="common.app_name">Mijn Gezondheidsoverzicht</Trans>
                </h2>

                <Button onClick={auth.removeUser} variant="ghost">
                    <Trans id="common.logout">Uitloggen</Trans>
                </Button>
            </Container>
        </header>
    );
}
