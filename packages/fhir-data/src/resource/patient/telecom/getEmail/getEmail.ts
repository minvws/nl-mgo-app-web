import type { Patient } from '../../../../fhir';
import { findByUse, safeGet } from '../../../../utils';

/**
 * Retrieve a string for the patient's email, with a preference order of undefined, "home", "work", or "temp" use.
 *
 * @see definition: https://hl7.org/fhir/stu3/datatypes.html#contactpoint
 * @see examples: https://hl7.org/fhir/stu3/datatypes-examples.html#ContactPoint
 */
export function getEmail(fhir?: Patient) {
    return safeGet(fhir, ({ telecom }) => {
        const emails = telecom!.filter((contact) => contact.system === 'email');
        return findByUse(emails, [undefined, 'home', 'work', 'temp'])!.value;
    });
}
