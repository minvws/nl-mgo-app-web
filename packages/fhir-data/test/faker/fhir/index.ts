import * as elements from './elements';
import * as fhirVersion from './fhirVersion';
import * as nictizNlProfile from './nictizNlProfile';
import * as resources from './resources';
import * as type from './type';

export const fhir = {
    ...type,
    ...elements,
    ...resources,
    ...nictizNlProfile,
    ...fhirVersion,
};
