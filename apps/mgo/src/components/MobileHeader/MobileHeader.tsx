import { useKeyDown } from '$/hooks';
import { useIntl } from '$/intl';
import {
    Container,
    Fade,
    MobileMenuButton,
    SlideDown,
    cn,
    surfaceStyle,
    useOpenState,
} from '@minvws/mgo-ui';
import { useCallback, useEffect, useRef, type ComponentProps, type FocusEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { StickyHeader } from './StickyHeader';

export type MobileHeaderProps = Omit<ComponentProps<'header'>, 'className'>;

const animationDuration = 300;

export function MobileHeader({ ...rest }: Readonly<MobileHeaderProps>) {
    const { formatMessage } = useIntl();
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);
    const { isOpen, close, toggle } = useOpenState();
    const location = useLocation();

    useEffect(() => {
        close();
    }, [close, location]);

    const onBlur = (event: FocusEvent) => {
        if (!menuContentRef.current?.contains(event.relatedTarget)) {
            close();
        }
    };

    const handleEsc = useCallback(() => {
        if (!isOpen) return;
        menuButtonRef.current?.focus();
        close();
    }, [close, isOpen]);

    useKeyDown({
        key: 'Escape',
        callback: handleEsc,
    });

    return (
        <>
            <Fade
                isVisible={isOpen}
                duration={animationDuration}
                onClick={close}
                className="fixed inset-0 z-10"
            >
                <div className="absolute inset-0 bg-black opacity-50" />
            </Fade>

            <StickyHeader
                menuIsOpen={isOpen}
                className={cn(
                    surfaceStyle,
                    'h-[70px]',
                    'border-b-solid border-b border-b-gray-50 dark:border-b-gray-700'
                )}
                {...rest}
            >
                <Container
                    className="z-40 flex h-full items-center justify-between"
                    ref={menuContentRef}
                    onBlur={onBlur}
                >
                    <MobileMenuButton
                        ref={menuButtonRef}
                        aria-expanded={isOpen}
                        onClick={toggle}
                        isOpen={isOpen}
                        openLabel={formatMessage('menu.menu')}
                        closeLabel={formatMessage('common.voice_over_close')}
                    />

                    <SlideDown
                        className={cn(
                            'top-[70px] max-h-[calc(100vh-70px)]',
                            'absolute left-0 z-20 w-full overflow-y-auto'
                        )}
                        isDown={isOpen}
                        duration={animationDuration}
                        onEnter={() => (document.body.style.overflow = 'hidden')}
                        onExited={() => (document.body.style.overflow = '')}
                    >
                        <MobileMenu />
                    </SlideDown>

                    <LogoutButton />
                </Container>
            </StickyHeader>
        </>
    );
}
