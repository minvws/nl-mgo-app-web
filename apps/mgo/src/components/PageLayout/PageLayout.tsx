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
                <ScrollRestoration />
                <LogoBanner className={hideMenu ? 'bg-transparent' : 'bg-white dark:bg-gray-900'} />
                {!hideMenu && (
                    <Header className="border-b-solid border-b border-b-gray-50 bg-white dark:border-b-gray-700 dark:bg-gray-900" />
                )}
                <Container
                    className={cn(
                        'flex flex-grow bg-[#FAFAFA] dark:bg-[#050505]',
                        hideMenu ? 'flex-col' : 'gap-8 py-6 md:gap-10 md:py-12 lg:gap-16'
                    )}
                >
                    {!hideMenu && !isMobile && <DesktopMenu />}
                    <main className="flex flex-grow flex-col">
                        <Outlet />
                    </main>
                </Container>

                <RibbonBanner />
            </div>
            <Footer />
        </>
    );
}
