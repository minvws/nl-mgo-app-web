import { Button, Container, cn } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';
import { useAuth } from 'react-oidc-context';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export interface MobileHeaderProps extends HTMLAttributes<HTMLElement> {}

export function MobileHeader({ className, ...rest }: MobileHeaderProps) {
    const auth = useAuth();

    return (
        <header
            data-testid="header-mobile"
            className={cn('sticky top-0 z-10 h-16 w-full', className)}
            {...rest}
        >
            <Container className="flex h-full items-center justify-between">
                <MobileMenu />
                <h2 className="text-xs font-bold leading-none">
                    <FormattedMessage
                        id="common.app_name"
                        description="Mijn Gezondheidsoverzicht"
                    />
                </h2>
                <Button onClick={() => auth.removeUser()} variant="ghost">
                    <FormattedMessage id="common.logout" description="Uitloggen" />
                </Button>
            </Container>
        </header>
    );
}
