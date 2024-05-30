import { fhir } from '$/api/fhir';
import { useNavFocusRef } from '$/hooks';
import { Container, Spinner } from '@minvws/mgo-mgo-ui';
import { useQuery } from '@tanstack/react-query';
import { type ReactNode } from 'react';

/* c8 ignore start (TODO) */

export function Playground() {
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>();
    const patientId = 'smart-1032702';

    const {
        isPending,
        error,
        data: patient,
    } = useQuery({
        queryKey: ['Patient', patientId],
        queryFn: async () => {
            return await fhir
                .getResource({
                    resource: 'Patient',
                    id: patientId,
                })
                .json();
        },
    });

    let result: ReactNode = (
        <ul className="grid grid-cols-2 gap-2">
            <li className="font-bold">patient id</li>
            <li className="font-bold">{patientId}</li>
            <li>Naam</li>
            <li>{patient?.name![0].text}</li>
            <li>Geboortedatum</li>
            <li>{patient?.birthDate}</li>
        </ul>
    );

    if (error) result = error.message;
    if (isPending) result = <Spinner className="mx-auto" />;

    return (
        <Container>
            <div className="container mx-auto mb-8 rounded-lg bg-gray-200 p-4 dark:stroke-gray-200">
                <h1 ref={navFocusRef}>Playground</h1>
                <div className="max-w-[600px] py-10">{result}</div>
            </div>
        </Container>
    );
}
