/* c8 ignore start */

/**
 * Functions for parsing FHIR resources
 * @see: https://build.fhir.org/resourcelist.html
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18
 */

export * from './zibMedicationUse/zibMedicationUse';
export * from './zibProduct/zibProduct';

import { type ZibMedicationUse } from './zibMedicationUse/zibMedicationUse';
import { type ZibProduct } from './zibProduct/zibProduct';

export type NictizResource = ZibMedicationUse | ZibProduct;
