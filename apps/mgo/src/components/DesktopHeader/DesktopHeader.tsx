import { FormattedMessage } from '$/intl';
import { Container } from '@minvws/mgo-ui';
import { type ComponentProps } from 'react';
import { LogoutButton } from '../LogoutButton/LogoutButton';

export type DesktopHeaderProps = Omit<ComponentProps<'header'>, 'className'>;

export function DesktopHeader({ ...rest }: Readonly<DesktopHeaderProps>) {
    return (
        <header className={'bg-t-bg-secondary'} {...rest}>
            <Container className="flex items-center justify-between py-4">
                <h2 className="text-t-cat-rijkslint font-sans text-5xl leading-none font-bold">
                    <FormattedMessage
                        id="common.app_name"
                        description="Mijn Gezondheidsoverzicht"
                    />
                </h2>

                <LogoutButton />
            </Container>
        </header>
    );
}
