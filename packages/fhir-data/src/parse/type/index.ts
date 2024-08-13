import * as general from './general/general';
import * as primitive from './primitive/primitive';
import * as special from './special/special';

/**
 * Functions for parsing FHIR data types,
 * @see: https://build.fhir.org/datatypes.html
 */
export const parse = {
    ...primitive,
    ...general,
    ...special,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MgoParsedType<T extends (arg: any) => any> = NonNullable<ReturnType<T>>;
export type MgoAnnotation = MgoParsedType<typeof parse.annotation>;
export type MgoBoolean = MgoParsedType<typeof parse.boolean>;
export type MgoCodeableConcept = MgoParsedType<typeof parse.codeableConcept>;
export type MgoCode = MgoParsedType<typeof parse.code>;
export type MgoCoding = MgoParsedType<typeof parse.coding>;
export type MgoDate = MgoParsedType<typeof parse.date>;
export type MgoDateTime = MgoParsedType<typeof parse.dateTime>;
export type MgoDuration = MgoParsedType<typeof parse.duration>;
export type MgoIdentifier = MgoParsedType<typeof parse.identifier>;
export type MgoPeriod = MgoParsedType<typeof parse.period>;
export type MgoQuantity = MgoParsedType<typeof parse.quantity>;
export type MgoRatio = MgoParsedType<typeof parse.ratio>;
export type MgoReference = MgoParsedType<typeof parse.reference>;
export type MgoRange = MgoParsedType<typeof parse.range>;
