import type { Bundle, FhirResource, InputFhir } from '../../fhir';
import { findByUse, getBundleResources, safeGetBulk } from '../../utils';

export function getMgoPatients<T extends FhirResource>(bundle: InputFhir<Bundle<T>>) {
    const patients = getBundleResources(bundle, 'Patient');

    return patients.map((patient) => {
        return {
            ...safeGetBulk(patient, {
                name: ({ name }) => {
                    const preferredName = findByUse(name, ['usual', 'official'], name[0]);
                    const { text, prefix = [], given = [], family, suffix = [] } = preferredName!;
                    if (text) return text;
                    return [...prefix, ...given, family, ...suffix].filter((x) => !!x).join(' ');
                },
                email: ({ telecom }) => {
                    const emails = telecom.filter((x) => x.system === 'email');
                    return findByUse(emails, [undefined, 'home', 'work', 'temp'])!.value;
                },
                birthDate: ({ birthDate }) => birthDate,
            }),
        };
    });
}

export type MgoPatient = ReturnType<typeof getMgoPatients>[number];
