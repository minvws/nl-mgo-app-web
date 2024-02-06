import { Fragment } from 'react';

export default function Error({ error }: { error?: Error }) {
    return (
        <Fragment>
            <main className="pt-4 dark:text-white">
                <h2>Er is een fout opgetreden</h2>
                <pre>
                    <code>{JSON.stringify(error, null, 2)}</code>
                </pre>
            </main>
        </Fragment>
    );
}
