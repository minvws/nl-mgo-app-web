import { Fragment } from 'react';
import { useAuth } from '../auth';

export default function Welcome() {
    const auth = useAuth();

    return (
        <Fragment>
            <main className="pt-4 dark:text-white">
                <h2>Succesvol ingelogd met DigiD</h2>
                <pre>
                    <code>{JSON.stringify(auth.user?.profile, null, 2)}</code>
                </pre>
                <button onClick={() => void auth.removeUser()}>Uitloggen</button>
            </main>
        </Fragment>
    );
}
