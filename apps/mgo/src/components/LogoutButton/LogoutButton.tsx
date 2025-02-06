import { Button } from '@minvws/mgo-mgo-ui';
import { FormattedMessage } from 'react-intl';
import { useAuth } from 'react-oidc-context';

export function LogoutButton() {
    const auth = useAuth();

    return (
        <Button onClick={auth.removeUser} variant="ghost">
            <FormattedMessage id="common.logout" description="Uitloggen" />
        </Button>
    );
}
