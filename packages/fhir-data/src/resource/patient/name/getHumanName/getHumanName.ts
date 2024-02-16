import type { Patient } from '../../../../fhir';
import { findByUse, safeGet } from '../../../../utils';

/**
 * Retrieve a string for the patient's name, with a preference for the "usual" use name.
 *
 * @see definition: https://hl7.org/fhir/stu3/datatypes.html#humanname
 * @see examples: https://hl7.org/fhir/stu3/datatypes-examples.html#humanname
 */
export function getHumanName(fhir?: Patient) {
    const name = safeGet(fhir, ({ name: names }) =>
        findByUse(names, ['usual', 'official'], names![0])
    );

    if (!name) return;

    const { text, prefix = [], given = [], family, suffix = [] } = name;

    if (text) return text;

    return [...prefix, ...given, family, ...suffix].filter((x) => !!x).join(' ');
}
