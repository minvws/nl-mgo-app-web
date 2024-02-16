import { getResource } from '@/fhir/client';
import { getHumanName, getEmail } from '@minvws/mgo-fhir-data/resource/patient/index.ts';
import { Spinner } from '@minvws/mgo-react-ui';
import { useQuery } from '@tanstack/react-query';
import { Fragment, type ReactNode } from 'react';

export function Playground() {
    const patientId = 'smart-1032702';

    const {
        isPending,
        error,
        data: patient,
    } = useQuery({
        queryKey: ['Patient', patientId],
        queryFn: async () => {
            return await getResource({
                resource: 'Patient',
                id: patientId,
            }).json();
        },
    });

    let result: ReactNode = (
        <div className="grid grid-cols-2 gap-2">
            <div className="font-bold">patient id</div>
            <div className="font-bold">{patientId}</div>
            <div>Naam</div>
            <div>{getHumanName(patient)}</div>
            <div>Geboortedatum</div>
            <div>{patient?.birthDate}</div>
            <div>Email</div>
            <div>{getEmail(patient)}</div>
            <div>Geslacht</div>
            <div>{patient?.gender}</div>
        </div>
    );

    if (error) result = error.message;
    if (isPending) result = <Spinner className="mx-auto" />;

    return (
        <Fragment>
            <div className="container mx-auto mb-8 rounded-lg bg-gray-200 p-4 dark:stroke-gray-200">
                <h2>Playground</h2>
                <div className="max-w-[600px] py-10">{result}</div>
            </div>
        </Fragment>
    );
}
