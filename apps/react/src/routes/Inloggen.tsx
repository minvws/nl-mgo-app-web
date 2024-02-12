import { Fragment } from 'react';
import { Button, Heading } from '@minvws/mgo-react-ui';

import { Busy } from './Busy.tsx';
import { Error } from './Error.tsx';
import { useAuth } from '../lib/auth';

export function Inloggen() {
    const auth = useAuth();

    if (auth.activeNavigator === 'signinSilent') {
        return <Busy task="inloggen" />;
    }
    if (auth.activeNavigator === 'signoutRedirect') {
        return <Busy task="uitloggen" />;
    }
    if (auth.isLoading) {
        return <Busy task="laden" />;
    }
    if (auth.error) {
        return <Error error={auth.error} />;
    }

    return (
        <Fragment>
            <Heading as="h1" size="lg" className="mb-8">
                Bewijs wie je bent
            </Heading>
            <p className="mb-8 text-xl">
                Kies de manier waarop je wilt bewijzen wie je bent. Zo kunnen we jouw gegevens
                veilig opvragen bij je huisarts, ziekenhuizen en andere zorgverleners.
            </p>
            <ul className="grid gap-4 text-xl">
                <li>
                    <Button
                        onClick={() => void auth.signinRedirect()}
                        variant="outline"
                        className="w-full"
                    >
                        Inloggen met DigiD
                    </Button>
                </li>
                <li>
                    <Button isDisabled={true} variant="outline" className="w-full">
                        Inloggen als gemachtigde
                    </Button>
                </li>
                <li>
                    <Button isDisabled={true} variant="outline" className="w-full">
                        European login
                    </Button>
                </li>
            </ul>
        </Fragment>
    );
}
