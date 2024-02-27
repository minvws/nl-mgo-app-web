import { useResponsive } from '@minvws/mgo-react-ui';
import { Outlet } from 'react-router';
import { DesktopHeader } from '../DesktopHeader/DesktopHeader';
import { Footer } from '../Footer/Footer';
import { LogoBanner } from '../LogoBanner/LogoBanner';
import { MobileHeader } from '../MobileHeader/MobileHeader';
import { RibbonBanner } from '../RibbonBanner/RibbonBanner';

export interface LayoutProps {
    hideMenu?: boolean;
}

export function PageLayout({ hideMenu }: LayoutProps = {}) {
    const isMobile = useResponsive({
        base: true,
        sm: false,
    });

    const Header = isMobile ? MobileHeader : DesktopHeader;

    return (
        <div>
            <div className="flex min-h-screen flex-col">
                <div className={hideMenu ? 'bg-transparent' : `bg-white`}>
                    {!isMobile && <LogoBanner />}
                    {!hideMenu && <Header />}
                </div>

                <main className="flex-grow">
                    <Outlet />
                </main>

                <RibbonBanner />
            </div>
            <Footer />
        </div>
    );
}
