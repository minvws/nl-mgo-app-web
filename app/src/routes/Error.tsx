import { Fragment } from 'react';

export default function Error({ error }: { error?: Error }) {
    return (
        <Fragment>
            <main style={{ paddingTop: '1rem' }}>
                <h2>Er is een fout opgetreden</h2>
                <pre>
                    <code>{JSON.stringify(error, null, 2)}</code>
                </pre>
            </main>
        </Fragment>
    );
}
