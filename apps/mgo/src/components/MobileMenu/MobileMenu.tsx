import { ButtonCard, Heading, IconButton, cn, useOpenState } from '@minvws/mgo-mgo-ui';
import * as Dialog from '@radix-ui/react-dialog';
import { useCallback, useEffect, useRef, type HTMLAttributes } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink, useBlocker } from 'react-router-dom';
import { MenuButton } from './MenuButton';

export interface MobileMenuProps extends HTMLAttributes<HTMLElement> {}

export function MobileMenu({ className, ...rest }: MobileMenuProps) {
    const intl = useIntl();
    const { isOpen, setIsOpen, close } = useOpenState();
    const navigating = useRef(false);
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) => currentLocation !== nextLocation
    );

    const handleCloseAutoFocus = useCallback((event: Event) => {
        if (navigating.current) {
            event.preventDefault();
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            navigating.current = false;
        }
    }, [isOpen]);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            navigating.current = true;
            close();
            blocker.proceed();
        }
    }, [blocker, close]);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Overlay />
            <MenuButton asChild>
                <Dialog.Trigger />
            </MenuButton>

            <Dialog.Portal>
                <Dialog.Content
                    onCloseAutoFocus={handleCloseAutoFocus}
                    className={cn(
                        'fixed left-0 top-0 z-50 flex h-screen w-screen flex-col bg-white dark:bg-[#050505]',
                        className
                    )}
                    {...rest}
                >
                    <div className="flex h-16 items-center justify-end border-b border-gray-100 p-4 dark:border-gray-500">
                        <Dialog.Title asChild>
                            <Heading
                                asChild
                                size="md"
                                className="absolute left-1/2 -translate-x-1/2"
                            >
                                <h2>
                                    <FormattedMessage id="menu.menu" description="Menu" />
                                </h2>
                            </Heading>
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <IconButton
                                icon="close"
                                size="sm"
                                aria-label={intl.formatMessage({ id: 'common.voice_over_close' })}
                            />
                        </Dialog.Close>
                    </div>
                    <ul className="overflow-y-auto">
                        <li>
                            <ButtonCard
                                className="outline-offset-[-2px]"
                                asChild
                                title={intl.formatMessage({ id: 'menu.overview_heading' })}
                                description={intl.formatMessage({ id: 'menu.overview_subheading' })}
                                icon="home"
                            >
                                <NavLink to="/overzicht" />
                            </ButtonCard>
                        </li>
                        <li>
                            <ButtonCard
                                className="outline-offset-[-2px]"
                                asChild
                                title={intl.formatMessage({ id: 'menu.about_heading' })}
                                description={intl.formatMessage({ id: 'menu.about_subheading' })}
                                icon="question-mark"
                            >
                                <NavLink to="/#over-de-site" />
                            </ButtonCard>
                        </li>
                    </ul>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
