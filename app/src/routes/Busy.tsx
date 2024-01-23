import { Fragment } from 'react';

export default function Busy({ task }: { task: string }) {
    return (
        <Fragment>
            <main style={{ paddingTop: '1rem' }}>
                <h2>Bezig met {task}...</h2>
            </main>
        </Fragment>
    );
}
