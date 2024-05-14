import { Trans, msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ButtonCard, Heading, IconButton, cn, useOpenState } from '@minvws/mgo-react-ui';
import * as Dialog from '@radix-ui/react-dialog';
import { type HTMLAttributes, useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { MenuButton } from './MenuButton';

export interface MobileMenuProps extends HTMLAttributes<HTMLElement> {}

export function MobileMenu({ className, ...rest }: MobileMenuProps) {
    const { _ } = useLingui();
    const { isOpen, setIsOpen, close } = useOpenState();

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) => currentLocation !== nextLocation
    );

    useEffect(() => {
        if (blocker.state === 'blocked') {
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
                    onCloseAutoFocus={(e) => e.preventDefault()}
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
                                    <Trans id="mobile-menu.dialog.title">Menu</Trans>
                                </h2>
                            </Heading>
                        </Dialog.Title>
                        <IconButton
                            asChild
                            icon="close"
                            aria-label={_(msg({ id: 'common.close', message: 'Sluiten' }))}
                            rounded
                            className="bg-gray-100"
                        >
                            <Dialog.Close />
                        </IconButton>
                    </div>
                    <ul className="overflow-auto">
                        <li>
                            <ButtonCard
                                asChild
                                title={_(msg({ id: 'menu.overview', message: 'Overzicht' }))}
                                description={_(
                                    msg({
                                        id: 'menu.overview.description',
                                        message:
                                            'Je medische gegevens van al je zorgverleners in één overzicht',
                                    })
                                )}
                                icon="home"
                            >
                                <NavLink to="/overzicht" />
                            </ButtonCard>
                        </li>
                        <li>
                            <ButtonCard
                                asChild
                                title={_(msg({ id: 'menu.about', message: 'Over de site' }))}
                                description={_(
                                    msg({
                                        id: 'menu.about.description',
                                        message:
                                            'Uitleg over hoe de site werkt en wat je er allemaal mee kan',
                                    })
                                )}
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
