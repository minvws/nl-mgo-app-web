import { useAuth } from '$/lib/auth';
import { Container, Heading } from '@minvws/mgo-react-ui';

export function Overview() {
    const auth = useAuth();

    return (
        <Container className="max-w-md py-10">
            <Heading asChild size="lg" className="mb-8">
                <h1>Succesvol ingelogd met DigiD</h1>
            </Heading>
            <pre className="bg-grey-200 dark:bg-grey-700 mb-8 rounded-lg p-4">
                <code className="block overflow-x-auto bg-white p-4 dark:bg-black">
                    {JSON.stringify(auth.user?.profile, null, 2)}
                </code>
            </pre>
            <button onClick={() => void auth.removeUser()} className="mb-8 text-xl font-bold">
                Uitloggen
            </button>
        </Container>
    );
}
