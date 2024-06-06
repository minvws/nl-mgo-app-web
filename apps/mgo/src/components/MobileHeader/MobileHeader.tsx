import { Trans } from '@lingui/macro';
import { Button, Container, cn } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { useAuth } from 'react-oidc-context';

export interface MobileHeaderProps extends HTMLAttributes<HTMLElement> {}

export function MobileHeader({ className, ...rest }: MobileHeaderProps) {
    const auth = useAuth();

    return (
        <header className={cn('sticky top-0 z-10 h-16 w-full', className)} {...rest}>
            <Container className="flex h-full items-center justify-between">
                <MobileMenu />
                <h2 className="text-xs font-bold leading-none">
                    <Trans id="mobile-header.heading">Mijn Gezondheidsoverzicht</Trans>
                </h2>
                <Button onClick={() => void auth.removeUser()} variant="ghost">
                    <Trans id="common.logout">Uitloggen</Trans>
                </Button>
            </Container>
        </header>
    );
}
