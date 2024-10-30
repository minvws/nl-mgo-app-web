import { type UiSchema } from '../../ui';
import { zibLaboratoryTestResultObservation } from '../zibLaboratoryTestResultObservation/zibLaboratoryTestResultObservation';
import { type GpLaboratoryResult } from './gpLaboratoryResult';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316997
 */
export function uiSchema(resource: GpLaboratoryResult): UiSchema {
    return zibLaboratoryTestResultObservation.uiSchema(resource);
}
