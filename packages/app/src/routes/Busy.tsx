import { Fragment } from 'react';

export default function Busy({ task }: { task: string }) {
    return (
        <Fragment>
            <main className="pt-4 dark:text-white">
                <h2>Bezig met {task}...</h2>
            </main>
        </Fragment>
    );
}
