import * as elements from './elements/index.js';
import * as fhirVersion from './fhirVersion.js';
import * as nictizNlProfile from './nictizNlProfile.js';
import * as resources from './resources/index.js';
import * as type from './type/index.js';

export const fhirR3 = {
    ...type,
    ...elements,
    ...resources,
    ...nictizNlProfile,
    ...fhirVersion,
};
