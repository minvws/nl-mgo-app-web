/* c8 ignore start */

export type { NictizNlProfile } from './fhir/nictizNlProfile';
export { getMgoResource } from './api/getMgoResource/getMgoResource';
export { getBundleMgoResources } from './api/getBundleMgoResources/getBundleMgoResources';
export { getUiSchema } from './api/getUiSchema/getUiSchema';
export { type MgoResource } from './api/resources/resources';
export * from './ui/types';
export {
    isSingleValue,
    isReferenceValue,
    isMultipleValue,
    isMultipleGroupValue,
} from './ui/helpers';
export { type Lossless } from './types/Lossless';

export { type FhirResource } from './fhir';

export * from './utils';

export * from './mgo/getMgoProblems/getMgoProblems';
export * from './mgo/getMgoMedicationStatements/getMgoMedicationStatements';
export * from './mgo/getMgoObservations/getMgoObservations';
export * from './mgo/getMgoDocuments/getMgoDocuments';
