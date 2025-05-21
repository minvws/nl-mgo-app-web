/**
 * Helper functions for dealing with value[x] and collections.
 * @see: https://build.fhir.org/extensibility.html#Extension
 */

export * from './createTypeParser/createTypeParser';
export * from './extension/extension';
export * from './extensionMultiple/extensionMultiple';
export * from './extensionNictiz/extensionNictiz';
export * from './filterCodeableConcept/filterCodeableConcept';
export * from './filterCoding/filterCoding';
export * from './filterPrimitive/filterPrimitive';
export * from './filterPrimitiveByExtension/filterPrimitiveByExtension';
export * from './findComponentByCode/findComponentByCode';
export * from './oneOfValueX/oneOfValueX';
export * from './parseObservationComponents/parseObservationComponents';
export * from './passThrough/passThrough';
