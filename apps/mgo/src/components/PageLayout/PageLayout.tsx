import { Container, cn, useResponsive } from '@minvws/mgo-mgo-ui';
import { Outlet } from '$/routing';
import { DesktopHeader } from '../DesktopHeader/DesktopHeader';
import { Footer } from '../Footer/Footer';
import { LogoBanner } from '../LogoBanner/LogoBanner';
import { MobileHeader } from '../MobileHeader/MobileHeader';
import { RibbonBanner } from '../RibbonBanner/RibbonBanner';
import { DesktopMenu } from '../DesktopMenu/DesktopMenu';
import { ScrollRestoration } from 'react-router-dom';

export interface LayoutProps {
    readonly hideMenu?: boolean;
}

export function PageLayout({ hideMenu }: LayoutProps = {}) {
    const isMobile = useResponsive({
        base: true,
        sm: false,
    });

    const Header = isMobile ? MobileHeader : DesktopHeader;

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <header>
                    <LogoBanner
                        className={hideMenu ? 'bg-transparent' : 'bg-white dark:bg-gray-900'}
                    />
                    {!hideMenu && (
                        <Header className="border-b-solid border-b border-b-gray-50 bg-white dark:border-b-gray-700 dark:bg-gray-900" />
                    )}
                </header>
                <main className="flex flex-grow flex-col">
                    <Container
                        className={cn(
                            'flex flex-grow overflow-x-hidden break-words bg-[#FAFAFA] dark:bg-[#050505]',
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

                    <RibbonBanner />
                </main>
                <Footer />
            </div>
            <ScrollRestoration />
        </>
    );
}
