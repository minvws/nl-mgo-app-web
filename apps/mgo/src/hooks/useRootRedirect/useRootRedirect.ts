import { useAuth } from '$/auth';
import { type RoutePath } from '$/routing';
import { type AppMessagesIds } from '@minvws/mgo-intl';
import { useOnboardingSeen } from '../useOnboardingSeen/useOnboardingSeen';

type RootRedirectConfig = {
    to: RoutePath;
    label: AppMessagesIds;
    ribbonLabel: AppMessagesIds;
};

export function useRootRedirect(): RootRedirectConfig {
    const auth = useAuth();
    const { isOnboardingSeen } = useOnboardingSeen();

    if (!isOnboardingSeen) {
        return {
            to: '/welkom',
            label: 'common.mgo_header_login_link',
            ribbonLabel: 'common.rijkslint_login_link',
        } as const;
    }

    if (auth.isAuthenticated) {
        return {
            to: '/overzicht',
            label: 'common.mgo_header_link',
            ribbonLabel: 'common.rijkslint_link',
        } as const;
    }

    return {
        to: '/inloggen',
        label: 'common.mgo_header_login_link',
        ribbonLabel: 'common.rijkslint_login_link',
    } as const;
}
