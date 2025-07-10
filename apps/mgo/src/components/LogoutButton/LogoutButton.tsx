import { useAuth } from '$/auth';
import { FormattedMessage } from '$/intl';
import { Button } from '@minvws/mgo-ui';

export function LogoutButton() {
    const auth = useAuth();

    return (
        <Button onClick={auth.logout} variant="ghost">
            <FormattedMessage id="common.logout" description="Uitloggen" />
        </Button>
    );
}
