import { FormattedMessage } from '$/intl';
import { Button } from '@minvws/mgo-mgo-ui';
import { useAuth } from 'react-oidc-context';

export function LogoutButton() {
    const auth = useAuth();

    return (
        <Button onClick={auth.removeUser} variant="ghost">
            <FormattedMessage id="common.logout" description="Uitloggen" />
        </Button>
    );
}
