import { type UiSchemaFunction } from '../../../ui/types';
import { nlCoreObservation } from '../nlCoreObservation/nlCoreObservation';
import { type ZibLivingSituation } from './zibLivingSituation';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export const uiSchema: UiSchemaFunction<ZibLivingSituation> = (resource, context) => {
    return nlCoreObservation.uiSchema(resource, context);
};
