import { Outlet } from '$/routing';
import { cn, Container, useResponsive } from '@minvws/mgo-mgo-ui';
import { ScrollRestoration } from 'react-router-dom';
import { DesktopHeader } from '../DesktopHeader/DesktopHeader';
import { DesktopMenu } from '../DesktopMenu/DesktopMenu';
import { Footer } from '../Footer/Footer';
import { LogoBanner } from '../LogoBanner/LogoBanner';
import { MobileHeader } from '../MobileHeader/MobileHeader';

export interface LayoutProps {
    readonly hideMenu?: boolean;
}

export function PageLayout({ hideMenu }: LayoutProps = {}) {
    const isMobile = useResponsive({
        base: true,
        sm: false,
    });

    const header = isMobile ? (
        <MobileHeader data-testid="header-mobile" />
    ) : (
        <DesktopHeader data-testid="header-desktop" />
    );

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <LogoBanner
                    className={cn(
                        'z-20',
                        hideMenu ? 'bg-transparent' : 'bg-white dark:bg-gray-900'
                    )}
                />

                {!hideMenu && header}

                <main className="flex flex-grow flex-col">
                    <Container
                        className={cn(
                            'flex flex-grow break-words bg-[#FAFAFA] dark:bg-[#050505]',
                            hideMenu
                                ? 'flex-col'
                                : 'gap-8 pb-8 pt-8 md:gap-10 md:pb-16 md:pt-10 lg:gap-16 lg:pb-24 lg:pt-12'
                        )}
                    >
                        {!hideMenu && !isMobile && <DesktopMenu />}
                        <div className="flex min-w-0 flex-grow flex-col">
                            <Outlet />
                        </div>
                    </Container>
                </main>
                <Footer />
            </div>
            <ScrollRestoration />
        </>
    );
}
