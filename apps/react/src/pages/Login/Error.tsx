import { Fragment } from 'react';
import { Heading } from '@minvws/mgo-react-ui';

export function Error({ error }: { error?: Error }) {
    return (
        <Fragment>
            <main className="pt-4 dark:text-white">
                <Heading asChild>
                    <h1>Er is een fout opgetreden</h1>
                </Heading>
                <pre>
                    <code>{JSON.stringify(error, null, 2)}</code>
                </pre>
            </main>
        </Fragment>
    );
}
