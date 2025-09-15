import { fhirR3Faker } from '@minvws/mgo-fhir/test/shared';
import { createMockFactory } from '@minvws/mgo-utils/test/shared';
import { parse } from '../../../../src/index.js';

const fhir = fhirR3Faker;

export const annotation = createMockFactory(() => parse.annotation(fhir.annotation())!);
export const boolean = createMockFactory(() => parse.boolean(fhir.boolean())!);
export const code = createMockFactory(() => parse.code(fhir.code())!);
export const codeableConcept = createMockFactory(
    () => parse.codeableConcept(fhir.codeableConcept())!
);
export const coding = createMockFactory(() => parse.coding(fhir.coding())!);
export const date = createMockFactory(() => parse.date(fhir.date())!);
export const dateTime = createMockFactory(() => parse.dateTime(fhir.dateTime())!);
export const decimal = createMockFactory(() => parse.decimal(fhir.decimal())!);
export const duration = createMockFactory(() => parse.duration(fhir.duration())!);
export const identifier = createMockFactory(() => parse.identifier(fhir.identifier())!);
export const instant = createMockFactory(() => parse.instant(fhir.instant())!);
export const integer = createMockFactory(() => parse.integer(fhir.integer())!);
export const integer64 = createMockFactory(() => parse.integer64(fhir.integer64())!);
export const period = createMockFactory(() => parse.period(fhir.period())!);
export const positiveInt = createMockFactory(() => parse.positiveInt(fhir.positiveInt())!);
export const quantity = createMockFactory(() => parse.quantity(fhir.quantity())!);
export const range = createMockFactory(() => parse.range(fhir.range())!);
export const ratio = createMockFactory(() => parse.ratio(fhir.ratio())!);
export const reference = createMockFactory(() => parse.reference(fhir.reference())!);
export const string = createMockFactory(() => parse.string(fhir.string())!);
export const unsignedInt = createMockFactory(() => parse.unsignedInt(fhir.unsignedInt())!);
export const attachment = createMockFactory(() => parse.attachment(fhir.attachment())!);
export const time = createMockFactory(() => parse.time(fhir.time())!);
export const sampledData = createMockFactory(() => parse.sampledData(fhir.sampledData())!);
export const timing = createMockFactory(() => parse.timing(fhir.timing())!);
export const simpleQuantity = createMockFactory(() => parse.simpleQuantity(fhir.simpleQuantity())!);
