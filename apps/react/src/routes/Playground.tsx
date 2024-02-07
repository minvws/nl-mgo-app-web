import { Fragment, useEffect, useState } from 'react';
import { getResource } from '@/fhir';

type Patient = {
    name: string;
};

export function Playground() {
    const [patient, setPatient] = useState<Patient>();

    async function load({ signal }: { signal: AbortSignal }) {
        console.log('Playground load');
        try {
            const response = await getResource({ resource: 'Patient' }, { signal });
            console.log({ response });
            const json = await response.json();
            console.log({ json });

            const firstPatient = json.entry![0];

            setPatient({
                name: firstPatient.resource!.name![0].given![0],
            });
        } catch (error: unknown) {
            if ((error as Error).name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.error('Fetch error:', error);
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        load({ signal });

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Fragment>
            <div className="mb-8 rounded-lg bg-gray-200 p-4 dark:stroke-gray-200">
                <h2 className="">Playground</h2>
                hello world
                <div>{patient?.name}</div>
            </div>
        </Fragment>
    );
}
