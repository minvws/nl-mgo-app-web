import { FormattedMessage } from '$/intl';
import { Container } from '@minvws/mgo-ui';
import { type ComponentProps } from 'react';
import { LogoutButton } from '../LogoutButton/LogoutButton';

export type DesktopHeaderProps = Omit<ComponentProps<'header'>, 'className'>;

export function DesktopHeader({ ...rest }: Readonly<DesktopHeaderProps>) {
    return (
        <header
            className={
                'border-b-solid border-b border-b-gray-50 bg-white dark:border-b-gray-700 dark:bg-gray-900'
            }
            {...rest}
        >
            <Container className="flex items-center justify-between py-4">
                <h2 className="text-xl font-normal leading-tight text-black dark:text-white">
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
