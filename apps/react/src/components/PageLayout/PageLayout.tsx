import { Container, twMerge, useResponsive } from '@minvws/mgo-react-ui';
import { Outlet } from '$/routing';
import { DesktopHeader } from '../DesktopHeader/DesktopHeader';
import { Footer } from '../Footer/Footer';
import { LogoBanner } from '../LogoBanner/LogoBanner';
import { MobileHeader } from '../MobileHeader/MobileHeader';
import { RibbonBanner } from '../RibbonBanner/RibbonBanner';
import { DesktopMenu } from '../DesktopMenu/DesktopMenu';

export interface LayoutProps {
    hideMenu?: boolean;
}

export function PageLayout({ hideMenu }: LayoutProps = {}) {
    const isMobile = useResponsive({
        base: true,
        sm: false,
    });

    /* c8 ignore start (TODO) */
    const Header = isMobile ? MobileHeader : DesktopHeader;
    /* c8 ignore stop */

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <LogoBanner
                    className={hideMenu ? 'bg-transparent' : 'bg-white dark:bg-[#050505]'}
                />
                {!hideMenu && <Header />}
                <Container
                    className={twMerge(
                        'flex flex-grow',
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
