import { createMockDataFactory } from '$test/faker/factory';
import * as parse from '../../../../src/parse/type';
import { fhir } from '../../fhir';

export const annotation = createMockDataFactory(() => parse.annotation(fhir.annotation())!);
export const boolean = createMockDataFactory(() => parse.boolean(fhir.boolean())!);
export const code = createMockDataFactory(() => parse.code(fhir.code())!);
export const codeableConcept = createMockDataFactory(
    () => parse.codeableConcept(fhir.codeableConcept())!
);
export const coding = createMockDataFactory(() => parse.coding(fhir.coding())!);
export const date = createMockDataFactory(() => parse.date(fhir.date())!);
export const dateTime = createMockDataFactory(() => parse.dateTime(fhir.dateTime())!);
export const decimal = createMockDataFactory(() => parse.decimal(fhir.decimal())!);
export const duration = createMockDataFactory(() => parse.duration(fhir.duration())!);
export const identifier = createMockDataFactory(() => parse.identifier(fhir.identifier())!);
export const instant = createMockDataFactory(() => parse.instant(fhir.instant())!);
export const integer = createMockDataFactory(() => parse.integer(fhir.integer())!);
export const integer64 = createMockDataFactory(() => parse.integer64(fhir.integer64())!);
export const period = createMockDataFactory(() => parse.period(fhir.period())!);
export const positiveInt = createMockDataFactory(() => parse.positiveInt(fhir.positiveInt())!);
export const quantity = createMockDataFactory(() => parse.quantity(fhir.quantity())!);
export const range = createMockDataFactory(() => parse.range(fhir.range())!);
export const ratio = createMockDataFactory(() => parse.ratio(fhir.ratio())!);
export const reference = createMockDataFactory(() => parse.reference(fhir.reference())!);
export const string = createMockDataFactory(() => parse.string(fhir.string())!);
export const unsignedInt = createMockDataFactory(() => parse.unsignedInt(fhir.unsignedInt())!);
export const attachment = createMockDataFactory(() => parse.attachment(fhir.attachment())!);
export const time = createMockDataFactory(() => parse.time(fhir.time())!);
export const sampledData = createMockDataFactory(() => parse.sampledData(fhir.sampledData())!);
export const timing = createMockDataFactory(() => parse.timing(fhir.timing())!);
export const simpleQuantity = createMockDataFactory(
    () => parse.simpleQuantity(fhir.simpleQuantity())!
);
