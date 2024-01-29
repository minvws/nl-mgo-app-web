import { Fragment } from 'react';
import { useAuth } from '../auth';

export default function Welcome() {
    const auth = useAuth();

    return (
        <Fragment>
            <main style={{ paddingTop: '1rem' }}>
                <h2>Succesvol ingelogd met DigiD</h2>
                <pre>
                    <code>{JSON.stringify(auth.user?.profile, null, 2)}</code>
                </pre>
                <button onClick={() => void auth.removeUser()}>Uitloggen</button>
            </main>
        </Fragment>
    );
}
