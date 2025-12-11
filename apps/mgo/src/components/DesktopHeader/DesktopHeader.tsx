import { FormattedMessage, useIntl } from '$/intl';
import { RouterLink } from '$/routing';
import { cn, Container, focusStyle } from '@minvws/mgo-ui';
import { type ComponentProps } from 'react';
import { LogoutButton } from '../LogoutButton/LogoutButton';

export type DesktopHeaderProps = Omit<ComponentProps<'header'>, 'className'>;

export function DesktopHeader({ ...rest }: Readonly<DesktopHeaderProps>) {
    const { formatMessage } = useIntl();

    return (
        <header className={'bg-t-bg-secondary'} {...rest}>
            <Container className="flex items-center justify-between py-4">
                <RouterLink
                    to="/"
                    aria-label={formatMessage('common.mgo_header_link')}
                    className={cn(focusStyle, 'block leading-none outline-offset-4')}
                >
                    <h2 className="text-t-cat-rijkslint font-sans text-2xl leading-none font-bold md:text-5xl">
                        <FormattedMessage
                            id="common.app_name"
                            description="Mijn Gezondheidsoverzicht"
                        />
                    </h2>
                </RouterLink>

                <LogoutButton />
            </Container>
        </header>
    );
}
