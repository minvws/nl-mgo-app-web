import { Heading } from '@minvws/mgo-react-ui';
import { useAuth } from '$/lib/auth';
import { useNavFocusRef } from '$/lib/useNavFocusRef';

export function Overview() {
    const auth = useAuth();
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();

    return (
        <section className="flex-grow">
            <Heading asChild size="lg" className="mb-8">
                <h2 ref={navFocusRef}>Succesvol ingelogd met DigiD</h2>
            </Heading>
            <pre className="bg-grey-200 dark:bg-grey-700 mb-8 rounded-lg p-4">
                <code className="block overflow-x-auto bg-white p-4 dark:bg-black">
                    {JSON.stringify(auth.user?.profile, null, 2)}
                </code>
            </pre>
            <button onClick={() => void auth.removeUser()} className="mb-8 text-xl font-bold">
                Uitloggen
            </button>
        </section>
    );
}
