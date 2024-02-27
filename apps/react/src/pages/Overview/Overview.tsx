import { Heading } from '@minvws/mgo-react-ui';
import { useAuth } from '$/lib/auth';

export function Overview() {
    const auth = useAuth();

    return (
        <main className="mx-auto max-w-lg pt-4">
            <Heading as="h1" size="lg" className="mb-8">
                Succesvol ingelogd met DigiD
            </Heading>
            <pre className="bg-grey-200 dark:bg-grey-700 mb-8 rounded-lg p-4">
                <code className="block overflow-x-auto bg-white p-4 dark:bg-black">
                    {JSON.stringify(auth.user?.profile, null, 2)}
                </code>
            </pre>
            <button onClick={() => void auth.removeUser()} className="mb-8 text-xl font-bold">
                Uitloggen
            </button>
        </main>
    );
}
