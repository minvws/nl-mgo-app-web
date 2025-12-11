import { Outlet } from '$/routing';
import { cn, Container, useResponsive } from '@minvws/mgo-ui';
import { ScrollRestoration } from 'react-router-dom';
import { DesktopHeader } from '../DesktopHeader/DesktopHeader';
import { DesktopMenu } from '../DesktopMenu/DesktopMenu';
import { Footer } from '../Footer/Footer';
import { MobileHeader } from '../MobileHeader/MobileHeader';
import { RibbonBanner } from '../RibbonBanner/RibbonBanner';

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
                <RibbonBanner
                    className={cn(
                        'z-20',
                        hideMenu ? 'bg-transparent' : 'bg-white dark:bg-gray-900'
                    )}
                />

                {!hideMenu && header}

                <main className="flex grow flex-col">
                    <Container
                        className={cn(
                            'bg-t-bg-primary flex grow break-words',
                            hideMenu
                                ? 'flex-col'
                                : 'gap-8 pt-8 pb-8 md:gap-10 md:pt-10 md:pb-10 lg:gap-16 lg:pt-12 lg:pb-12'
                        )}
                    >
                        {!hideMenu && !isMobile && <DesktopMenu />}
                        <div className="flex min-w-0 grow flex-col">
                            <Outlet />
                        </div>
                    </Container>
                </main>
            </div>
            <Footer />
            <ScrollRestoration />
        </>
    );
}
