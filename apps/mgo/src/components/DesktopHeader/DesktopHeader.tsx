import { useAuth } from '$/lib/auth';
import { Button, Container, cn } from '@minvws/mgo-mgo-ui';
import { type HTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';

export interface DesktopHeaderProps extends HTMLAttributes<HTMLElement> {}

export function DesktopHeader({ className, ...rest }: DesktopHeaderProps) {
    const auth = useAuth();

    return (
        <header data-testid="header-desktop" className={cn(className)} {...rest}>
            <Container className="flex items-center justify-between py-4">
                <h2 className="text-xl font-normal leading-tight text-black dark:text-white">
                    <FormattedMessage
                        id="common.app_name"
                        description="Mijn Gezondheidsoverzicht"
                    />
                </h2>

                <Button onClick={auth.removeUser} variant="ghost">
                    <FormattedMessage id="common.logout" description="Uitloggen" />
                </Button>
            </Container>
        </header>
    );
}
