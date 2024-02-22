import { Fragment } from 'react';
import { Heading } from '@minvws/mgo-react-ui';

export function Busy({ task }: { task: string }) {
    return (
        <Fragment>
            <main className="pt-4 dark:text-white">
                <Heading as="h1">Bezig met {task}...</Heading>
            </main>
        </Fragment>
    );
}
