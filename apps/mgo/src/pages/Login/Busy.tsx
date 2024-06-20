import { Heading } from '@minvws/mgo-mgo-ui';

export function Busy({ task }: { readonly task: string }) {
    return (
        <main className="pt-4 dark:text-white">
            <Heading>
                <h1>Bezig met {task}...</h1>
            </Heading>
        </main>
    );
}
