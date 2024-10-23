import { Address } from 'fhir/r3';
import { AllergyIntolerance } from 'fhir/r3';
import { Annotation } from 'fhir/r3';
import { CodeableConcept } from 'fhir/r3';
import { Coding } from 'fhir/r3';
import { Condition } from 'fhir/r3';
import { Consent } from 'fhir/r3';
import { ContactPoint } from 'fhir/r3';
import { Coverage } from 'fhir/r3';
import { Device } from 'fhir/r3';
import { DeviceUseStatement } from 'fhir/r3';
import { DomainResource } from 'fhir/r3';
import { Dosage } from 'fhir/r3';
import { Duration } from 'fhir/r3';
import { Element as Element_2 } from 'fhir/r3';
import { Encounter } from 'fhir/r3';
import { Flag } from 'fhir/r3';
import { HumanName } from 'fhir/r3';
import { Identifier } from 'fhir/r3';
import { Immunization } from 'fhir/r3';
import { LosslessNumber } from 'lossless-json';
import { Medication } from 'fhir/r3';
import { MedicationDispense } from 'fhir/r3';
import { MedicationIngredient } from 'fhir/r3';
import { MedicationPackage } from 'fhir/r3';
import { MedicationRequest } from 'fhir/r3';
import { MedicationStatement } from 'fhir/r3';
import { NutritionOrder } from 'fhir/r3';
import { Observation } from 'fhir/r3';
import { Patient } from 'fhir/r3';
import { Period } from 'fhir/r3';
import { Procedure } from 'fhir/r3';
import { Quantity } from 'fhir/r3';
import { Range as Range_2 } from 'fhir/r3';
import { Ratio } from 'fhir/r3';
import { Reference } from 'fhir/r3';
import { Resource } from 'fhir/r3';
import { Timing } from 'fhir/r3';

declare interface Actor {
    role: parse.MgoCodeableConcept | undefined;
    reference: parse.MgoReference | undefined;
}

declare interface Actor_2 {
    actor: parse.MgoReference | undefined;
}

export declare const annotation: (value: Nullable<Annotation>) => MgoAnnotation | undefined;

declare interface BaseEntry<T extends string | string[] | string[][]> extends UiSchemaElement, ValueOptions {
    display: T | undefined;
    type: string;
}

export declare const boolean: (value: Nullable<boolean>) => boolean | undefined;

export declare const code: (value: Nullable<string>) => string | undefined;

export declare const codeableConcept: (value: Nullable<CodeableConcept>) => MgoCodeableConcept | undefined;

export declare const coding: (value: Nullable<Coding>) => MgoCoding | undefined;

export declare type CombinedUiFunction<Input1, Input2, Output extends UiEntry | UiEntry[]> = (label: string, value1: Nullable<Lossless<Input1>>, value2: Nullable<Lossless<Input2>>, options?: ValueOptions) => Output;

declare interface Communication {
    language: parse.MgoCodeableConcept | undefined;
    preferred: parse.MgoBoolean | undefined;
}

declare interface Contact {
    relationship: parse.MgoCodeableConcept[] | undefined;
    name: NlCoreHumanname | undefined;
    telecom: NlCoreContactpoint[] | undefined;
    address: NlCoreAddress | undefined;
    gender: parse.MgoString | undefined;
    organization: parse.MgoReference | undefined;
    period: parse.MgoPeriod | undefined;
}

declare interface Data {
    meaning: parse.MgoCode | undefined;
    reference: parse.MgoReference | undefined;
}

export declare const date: (value: Nullable<string>) => DateString | undefined;

/**
 * A date, or partial date (e.g. just year or year + month) as used in human communication.
 * The format is a subset of [ISO8601] icon: YYYY, YYYY-MM, or YYYY-MM-DD
 * @see: https://build.fhir.org/datatypes.html#date
 * @example
 * 2018
 * 1973-06
 * 1905-08-23
 */
declare type DateString = `${number}` | `${number}-${number}` | `${number}-${number}-${number}`;

export declare const dateTime: (value: Nullable<string>) => DateTimeString | undefined;

/**
 * A date, date-time or partial date (e.g. just year or year + month) as used in human communication.
 * The format is a subset of [ISO8601] icon: YYYY, YYYY-MM, YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+zz:zz,
 * @see: https://build.fhir.org/datatypes.html#dateTime
 * @example
 * 2018,
 * 1973-06,
 * 1905-08-23,
 * 2015-02-07T13:28:17-05:00,
 * 2017-01-01T00:00:00.000Z.
 */
declare type DateTimeString =
| `${number}`
| `${number}-${number}`
| `${number}-${number}-${number}`
| `${number}-${number}-${number}T${number}:${number}:${number}${string}`;

export declare const decimal: (value: Nullable<number>) => MgoDecimal | undefined;

/**
 * Perform a deep replacement of a type in another type definition.
 *
 * @example
 * type Foo =  { foo: string; bar: number; baz: { qux: number } }
 * DeepReplaceType<Foo, number, boolean> // { foo: string, bar: boolean, baz: { qux: boolean } }
 * DeepReplaceType<number, number, boolean> // boolean
 * DeepReplaceType<number | string, number, boolean> // boolean | string
 * DeepReplaceType<(number | string)[], number, boolean> // (boolean | string)[]
 */
declare type DeepReplaceType<T, ToReplace, Replacement> = T extends ToReplace
? Exclude<T, ToReplace> | Replacement
: T extends object
? DeepReplaceTypeInObject<T, ToReplace, Replacement>
: T;

declare type DeepReplaceTypeInObject<T extends object, ToReplace, Replacement> = {
    [key in keyof T]: T[key] extends object
    ? DeepReplaceTypeInObject<T[key], ToReplace, Replacement>
    : T[key] extends (infer U)[]
    ? DeepReplaceType<U, ToReplace, Replacement>[]
    : DeepReplaceType<T[key], ToReplace, Replacement>;
};

declare interface Diagnosis {
    condition: parse.MgoReference | undefined;
    role: parse.MgoCodeableConcept | undefined;
    rank: parse.MgoPositiveInt | undefined;
}

export declare const duration: (value: Nullable<Duration>) => MgoQuantity | undefined;

declare interface Evidence {
    code: parse_2.MgoCodeableConcept[] | undefined;
    detail: parse_2.MgoReference[] | undefined;
}

declare interface Except {
    type: parse.MgoCode | undefined;
    period: parse.MgoPeriod | undefined;
    actor: Actor[] | undefined;
    action: parse.MgoCodeableConcept[] | undefined;
    securityLabel: parse.MgoCoding[] | undefined;
    purpose: parse.MgoCoding[] | undefined;
    class: parse.MgoCoding[] | undefined;
    code: parse.MgoCoding[] | undefined;
    dataPeriod: parse.MgoPeriod | undefined;
    data: Data[] | undefined;
}

declare function extension<T extends DomainResource | Element_2, ValueType extends ParserKey, ParsedType = ReturnTypeParser<ValueType>>(resource: T | undefined, url: string, valueType: ValueType): ParsedType;

declare function extensionNictiz<T extends DomainResource | Element_2, Id extends NictizId, ValueType = (typeof nictizIdValueXMap)[Id], R = ReturnTypeParser<ValueType>>(resource: T | undefined, zibId: Id): R;

declare interface FocalDevice {
    manipulated: parse.MgoReference | undefined;
}

declare interface Grouping {
    group: parse.MgoString | undefined;
    groupDisplay: parse.MgoString | undefined;
    subGroup: parse.MgoString | undefined;
    subGroupDisplay: parse.MgoString | undefined;
    plan: parse.MgoString | undefined;
    planDisplay: parse.MgoString | undefined;
    subPlan: parse.MgoString | undefined;
    subPlanDisplay: parse.MgoString | undefined;
    class: parse.MgoString | undefined;
    classDisplay: parse.MgoString | undefined;
    subClass: parse.MgoString | undefined;
    subClassDisplay: parse.MgoString | undefined;
}

declare interface Hospitalization {
    admitSource: parse.MgoCodeableConcept | undefined;
    dischargeDisposition: parse.MgoCodeableConcept | undefined;
}

export declare const identifier: (value: Nullable<Identifier>) => MgoIdentifier | undefined;

export declare const integer: (value: Nullable<number>) => MgoInteger | undefined;

export declare const integer64: (value: Nullable<number>) => MgoInteger64 | undefined;

declare interface Link {
    other: parse.MgoReference | undefined;
    type: parse.MgoCode | undefined;
}

declare type Lossless<T> = T extends number
? T | LosslessNumber
: T extends object
? T | LosslessJson<T>
: T;

declare type LosslessJson<T = unknown> = DeepReplaceType<T, number, LosslessNumber>;

export declare interface MgoAnnotation {
    time: DateTimeString | undefined;
    text: string | undefined;
    author: MgoReference | undefined;
}

declare type MgoAttachment = {
    contentType: parse.MgoString | undefined;
    language: parse.MgoString | undefined;
    data: parse.MgoString | undefined;
    url: parse.MgoString | undefined;
    size: parse.MgoUnsignedInt | undefined;
    hash: parse.MgoString | undefined;
    title: parse.MgoString | undefined;
    creation: parse.MgoDateTime | undefined;
};

export declare type MgoBoolean = boolean;

export declare type MgoCode = string;

export declare type MgoCodeableConcept = MgoCoding[];

export declare interface MgoCoding {
    code?: string;
    display?: string;
    system?: string;
}

export declare type MgoDate = DateString;

export declare type MgoDateTime = DateTimeString;

export declare type MgoDecimal = number & {
    readonly '': unique symbol;
};

export declare type MgoDuration = MgoQuantity;

export declare interface MgoIdentifier {
    use: string | undefined;
    system: string | undefined;
    value: string | undefined;
    type: MgoCodeableConcept | undefined;
}

export declare type MgoInteger = number & {
    readonly '': unique symbol;
};

export declare type MgoInteger64 = number & {
    readonly '': unique symbol;
};

export declare interface MgoPeriod {
    start: DateTimeString | undefined;
    end: DateTimeString | undefined;
}

export declare type MgoPositiveInt = number & {
    readonly '': unique symbol;
};

export declare interface MgoQuantity {
    value: number | undefined;
    comparator: string | undefined;
    unit: string | undefined;
    system: string | undefined;
    code: string | undefined;
}

export declare interface MgoRange {
    low: MgoQuantity | undefined;
    high: MgoQuantity | undefined;
}

export declare interface MgoRatio {
    numerator: MgoQuantity | undefined;
    denominator: MgoQuantity | undefined;
}

export declare interface MgoReference {
    reference: string | undefined;
    display: string | undefined;
}

export declare type MgoString = string;

export declare type MgoUnsignedInt = number & {
    readonly '': unique symbol;
};

export declare interface MultipleGroupValue extends BaseEntry<string[][]> {
}

export declare interface MultipleValue extends BaseEntry<string[]> {
}

declare type NictizId = keyof typeof nictizIdValueXMap;

declare const nictizIdValueXMap: {
    'BodySite-Qualifier': "codeableConcept";
    'deviceUseStatement-reasonReferenceSTU3': "reference";
    'zib-MedicalDevice-Organization': "reference";
    'zib-MedicalDevice-Practitioner': "reference";
    'zib-MedicationUse-AsAgreedIndicator': "boolean";
    'zib-MedicationUse-Prescriber': "reference";
    'zib-MedicationUse-Author': "reference";
    'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse': "codeableConcept";
    'zib-Medication-MedicationTreatment': "identifier";
    'zib-Medication-RepeatPeriodCyclicalSchedule': "duration";
    'zib-MedicationUse-Duration': "duration";
    'zib-Product-Description': "string";
    'zib-NutritionAdvice-Explanation': "string";
    'zib-Medication-PeriodOfUse': "period";
    'zib-Medication-AdditionalInformation': "codeableConcept";
    'zib-Medication-StopType': "codeableConcept";
    'zib-AdministrationAgreement-AuthoredOn': "dateTime";
    'zib-AdministrationAgreement-AgreementReason': "string";
    'zib-AdvanceDirective-Disorder': "reference";
    Comment: "string";
};

declare type NictizNlProfile =
| `http://fhir.nl/fhir/StructureDefinition/nl-core-${string}`
| `http://nictiz.nl/fhir/StructureDefinition/zib-${string}`
| `http://nictiz.nl/fhir/StructureDefinition/gp-${string}`;

export declare interface NlCoreAddress {
    use: parse.MgoString | undefined;
    type: parse.MgoString | undefined;
    text: parse.MgoString | undefined;
    line: parse.MgoString[] | undefined;
    city: parse.MgoString | undefined;
    district: parse.MgoString | undefined;
    state: parse.MgoString | undefined;
    postalCode: parse.MgoString | undefined;
    country: parse.MgoString | undefined;
    period: parse.MgoPeriod | undefined;
}

export declare const nlCoreAddress: {
    parse: typeof parseNlCoreAddress;
    uiSchemaGroup: typeof uiSchemaGroup_5;
};

export declare interface NlCoreContactpoint {
    system: parse.MgoString | undefined;
    value: parse.MgoString | undefined;
    use: parse.MgoString | undefined;
    rank: parse.MgoPositiveInt | undefined;
    period: parse.MgoPeriod | undefined;
}

export declare const nlCoreContactpoint: {
    parse: typeof parseNlCoreContactpoint;
    uiSchemaGroup: typeof uiSchemaGroup_6;
};

export declare type NlCoreHumanname = {
    family: parse.MgoString | undefined;
    given: parse.MgoString[] | undefined;
    period: parse.MgoPeriod | undefined;
    prefix: parse.MgoString[] | undefined;
    suffix: parse.MgoString[] | undefined;
    text: parse.MgoString | undefined;
    use: parse.MgoString | undefined;
};

export declare const nlCoreHumanname: {
    parse: typeof parseNlCoreHumanname;
    uiSchemaGroup: typeof uiSchemaGroup_7;
};

export declare type NlCoreObservation = ReturnType<typeof parseNlCoreObservation>;

export declare const nlCoreObservation: {
    profile: "http://fhir.nl/fhir/StructureDefinition/nl-core-observation";
    parse: (resource: Observation) => {
        identifier: parse.MgoIdentifier[] | undefined;
        status: string | undefined;
        category: parse.MgoCodeableConcept[] | undefined;
        subject: parse.MgoReference | undefined;
        context: parse.MgoReference | undefined;
        valueQuantity: parse.MgoQuantity | undefined;
        effectivePeriod: parse.MgoPeriod | undefined;
        dataAbsentReason: parse.MgoCodeableConcept | undefined;
        method: parse.MgoCodeableConcept | undefined;
        bodySite: parse.MgoCodeableConcept | undefined;
        effectiveDateTime: DateTimeString | undefined;
        comment: string | undefined;
        id: string | undefined;
        referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
        resourceType: string | undefined;
        profile: "http://fhir.nl/fhir/StructureDefinition/nl-core-observation";
    };
    uiSchema: typeof uiSchema;
};

export declare type NlCorePatient = ReturnType<typeof parseNlCorePatient>;

export declare const nlCorePatient: {
    profile: "http://fhir.nl/fhir/StructureDefinition/nl-core-patient";
    parse: typeof parseNlCorePatient;
    uiSchema: typeof uiSchema_2;
};

declare type Nullable<T> = T | null | undefined;

export declare namespace parse {
    export {
        extension,
        extensionNictiz,
        resourceMeta,
        quantity,
        MgoQuantity,
        MgoAnnotation,
        annotation,
        MgoBoolean,
        boolean,
        MgoCode,
        code,
        MgoCodeableConcept,
        codeableConcept,
        MgoCoding,
        coding,
        MgoDate,
        date,
        MgoDateTime,
        dateTime,
        MgoDuration,
        duration,
        MgoIdentifier,
        identifier,
        MgoPeriod,
        period,
        MgoRange,
        range,
        MgoRatio,
        ratio,
        MgoReference,
        reference,
        MgoString,
        string,
        MgoDecimal,
        decimal,
        MgoUnsignedInt,
        unsignedInt,
        MgoInteger,
        integer,
        MgoInteger64,
        integer64,
        MgoPositiveInt,
        positiveInt
    }
}

declare namespace parse_2 {
    export {
        quantity,
        MgoQuantity,
        MgoAnnotation,
        annotation,
        MgoBoolean,
        boolean,
        MgoCode,
        code,
        MgoCodeableConcept,
        codeableConcept,
        MgoCoding,
        coding,
        MgoDate,
        date,
        MgoDateTime,
        dateTime,
        MgoDuration,
        duration,
        MgoIdentifier,
        identifier,
        MgoPeriod,
        period,
        MgoRange,
        range,
        MgoRatio,
        ratio,
        MgoReference,
        reference,
        MgoString,
        string,
        MgoDecimal,
        decimal,
        MgoUnsignedInt,
        unsignedInt,
        MgoInteger,
        integer,
        MgoInteger64,
        integer64,
        MgoPositiveInt,
        positiveInt
    }
}

declare type ParseMap = typeof parse_2;

/**
 * @name HCIM NlCoreAddress
 * @usage Patient.address
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
declare function parseNlCoreAddress(value: Nullable<Address>): NlCoreAddress;

/**
 * @name HCIM NlCoreContactpoint
 * @usage Patient.telecom
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317022
 */
declare function parseNlCoreContactpoint(value: Nullable<ContactPoint>): NlCoreContactpoint;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317028
 */
declare function parseNlCoreHumanname(value: Nullable<HumanName>): NlCoreHumanname;

declare const parseNlCoreObservation: (resource: Observation) => {
    identifier: parse.MgoIdentifier[] | undefined;
    status: string | undefined;
    category: parse.MgoCodeableConcept[] | undefined;
    subject: parse.MgoReference | undefined;
    context: parse.MgoReference | undefined;
    valueQuantity: parse.MgoQuantity | undefined;
    effectivePeriod: parse.MgoPeriod | undefined;
    dataAbsentReason: parse.MgoCodeableConcept | undefined;
    method: parse.MgoCodeableConcept | undefined;
    bodySite: parse.MgoCodeableConcept | undefined;
    effectiveDateTime: DateTimeString | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://fhir.nl/fhir/StructureDefinition/nl-core-observation";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function parseNlCorePatient(resource: Patient): {
    active: boolean | undefined;
    address: NlCoreAddress[] | undefined;
    birthDate: DateString | undefined;
    communication: Communication[] | undefined;
    contact: Contact[] | undefined;
    deceased: boolean | undefined;
    deceasedDateTime: DateTimeString | undefined;
    gender: string | undefined;
    generalPractitioner: parse.MgoReference[] | undefined;
    identifier: parse.MgoIdentifier[] | undefined;
    link: Link[] | undefined;
    managingOrganization: parse.MgoReference | undefined;
    maritalStatus: parse.MgoCodeableConcept | undefined;
    multipleBirth: boolean | undefined;
    multipleBirthInteger: parse.MgoInteger | undefined;
    name: NlCoreHumanname[] | undefined;
    photo: MgoAttachment[] | undefined;
    telecom: NlCoreContactpoint[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://fhir.nl/fhir/StructureDefinition/nl-core-patient";
};

declare type ParserKey = keyof ParseMap;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317124
 */
declare function parseZibAdministrationAgreement(resource: MedicationDispense): {
    authoredOn: DateTimeString | undefined;
    agreementReason: string | undefined;
    usageDuration: parse.MgoQuantity | undefined;
    additionalInformation: parse.MgoCodeableConcept | undefined;
    medicationTreatment: parse.MgoIdentifier | undefined;
    stopType: parse.MgoCodeableConcept | undefined;
    repeatPeriodCyclicalSchedule: parse.MgoQuantity | undefined;
    identifier: parse.MgoIdentifier[] | undefined;
    status: string | undefined;
    category: parse.MgoCodeableConcept | undefined;
    medicationReference: parse.MgoReference | undefined;
    quantity: parse.MgoQuantity | undefined;
    daysSupply: parse.MgoQuantity | undefined;
    note: parse.MgoAnnotation[] | undefined;
    dossageInstruction: ZibInstructionsForUse[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement";
};

/**
 * @name HCIM AdministrationSchedule
 * @usage zibInstructionsForUse.timing
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317128
 */
declare function parseZibAdministrationSchedule(value: Nullable<Timing>): ZibAdministrationSchedule;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317129
 */
declare function parseZibAdvanceDirective(resource: Consent): {
    category: parse.MgoCodeableConcept[] | undefined;
    dateTime: DateTimeString | undefined;
    disorder: parse.MgoReference | undefined;
    consentingParty: parse.MgoReference[] | undefined;
    source: {
        attachment: MgoAttachment;
        identifier: parse.MgoIdentifier | undefined;
        reference: parse.MgoReference | undefined;
    };
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317134
 */
declare function parseZibAlcoholUse(resource: Observation): {
    identifier: MgoIdentifier[] | undefined;
    status: string | undefined;
    category: MgoCodeableConcept[] | undefined;
    subject: MgoReference | undefined;
    context: MgoReference | undefined;
    valueQuantity: MgoQuantity | undefined;
    effectivePeriod: MgoPeriod | undefined;
    dataAbsentReason: MgoCodeableConcept | undefined;
    method: MgoCodeableConcept | undefined;
    bodySite: MgoCodeableConcept | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317136
 */
declare function parseZibAlert(resource: Flag): {
    identifier: parse.MgoIdentifier[] | undefined;
    status: string | undefined;
    category: parse.MgoCodeableConcept | undefined;
    code: parse.MgoCodeableConcept | undefined;
    subject: parse.MgoReference | undefined;
    period: parse.MgoPeriod | undefined;
    encounter: parse.MgoReference | undefined;
    author: parse.MgoReference | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Alert";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317138
 */
declare function parseZibAllergyIntolerance(resource: AllergyIntolerance): {
    identifier: parse.MgoIdentifier[] | undefined;
    clinicalStatus: string | undefined;
    verificationStatus: string | undefined;
    type: string | undefined;
    category: string[] | undefined;
    criticality: string | undefined;
    code: parse.MgoCodeableConcept | undefined;
    patient: parse.MgoReference | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-AllergyIntolerance";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
declare function parseZibBloodPressure(resource: Observation): {
    cuffTypeLOINC: {
        valueCodeableConcept: parse.MgoCodeableConcept | undefined;
    };
    cuffTypeSNOMED: {
        valueCodeableConcept: parse.MgoCodeableConcept | undefined;
    };
    diastolicEndpoint: {
        valueCodeableConcept: parse.MgoCodeableConcept | undefined;
    };
    systolicBP: {
        valueQuantity: parse.MgoQuantity | undefined;
    };
    diastolicBP: {
        valueQuantity: parse.MgoQuantity | undefined;
    };
    averageBloodPressureLOINC: {
        valueQuantity: parse.MgoQuantity | undefined;
    };
    averageBloodPressureSNOMED: {
        valueQuantity: parse.MgoQuantity | undefined;
    };
    positionSNOMED: {
        valueCodeableConcept: parse.MgoCodeableConcept | undefined;
    };
    positionLOINC: {
        valueCodeableConcept: parse.MgoCodeableConcept | undefined;
    };
    identifier: parse.MgoIdentifier[] | undefined;
    status: string | undefined;
    category: parse.MgoCodeableConcept[] | undefined;
    subject: parse.MgoReference | undefined;
    context: parse.MgoReference | undefined;
    valueQuantity: parse.MgoQuantity | undefined;
    effectivePeriod: parse.MgoPeriod | undefined;
    dataAbsentReason: parse.MgoCodeableConcept | undefined;
    method: parse.MgoCodeableConcept | undefined;
    bodySite: parse.MgoCodeableConcept | undefined;
    effectiveDateTime: DateTimeString | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-BloodPressure";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317149
 */
declare function parseZibBodyHeight(resource: Observation): {
    identifier: MgoIdentifier[] | undefined;
    status: string | undefined;
    category: MgoCodeableConcept[] | undefined;
    subject: MgoReference | undefined;
    context: MgoReference | undefined;
    valueQuantity: MgoQuantity | undefined;
    effectivePeriod: MgoPeriod | undefined;
    dataAbsentReason: MgoCodeableConcept | undefined;
    method: MgoCodeableConcept | undefined;
    bodySite: MgoCodeableConcept | undefined;
    effectiveDateTime: DateTimeString | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-BodyHeight";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317153
 */
declare function parseZibBodyWeight(resource: Observation): {
    clothing: {
        valueCodeableConcept: parse.MgoCodeableConcept | undefined;
    };
    identifier: parse.MgoIdentifier[] | undefined;
    status: string | undefined;
    category: parse.MgoCodeableConcept[] | undefined;
    subject: parse.MgoReference | undefined;
    context: parse.MgoReference | undefined;
    valueQuantity: parse.MgoQuantity | undefined;
    effectivePeriod: parse.MgoPeriod | undefined;
    dataAbsentReason: parse.MgoCodeableConcept | undefined;
    method: parse.MgoCodeableConcept | undefined;
    bodySite: parse.MgoCodeableConcept | undefined;
    effectiveDateTime: DateTimeString | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317175
 */
declare function parseZibDrugUse(resource: Observation): {
    identifier: MgoIdentifier[] | undefined;
    status: string | undefined;
    category: MgoCodeableConcept[] | undefined;
    subject: MgoReference | undefined;
    context: MgoReference | undefined;
    valueQuantity: MgoQuantity | undefined;
    effectivePeriod: MgoPeriod | undefined;
    dataAbsentReason: MgoCodeableConcept | undefined;
    method: MgoCodeableConcept | undefined;
    bodySite: MgoCodeableConcept | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317177
 */
declare function parseZibEncounter(resource: Encounter): {
    class: parse.MgoCoding | undefined;
    participant: Participant[] | undefined;
    serviceProvider: parse.MgoReference | undefined;
    period: parse.MgoPeriod | undefined;
    diagnosis: Diagnosis[] | undefined;
    reason: parse.MgoCodeableConcept[] | undefined;
    hospitalization: Hospitalization;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Encounter";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317206
 */
declare function parseZibFunctionalOrMentalStatus(resource: Observation): {
    identifier: MgoIdentifier[] | undefined;
    status: string | undefined;
    category: MgoCodeableConcept[] | undefined;
    subject: MgoReference | undefined;
    context: MgoReference | undefined;
    valueQuantity: MgoQuantity | undefined;
    effectivePeriod: MgoPeriod | undefined;
    dataAbsentReason: MgoCodeableConcept | undefined;
    method: MgoCodeableConcept | undefined;
    bodySite: MgoCodeableConcept | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus";
};

/**
 * @name HCIM InstructionsForUse
 * @usage zibMedicationUse.dosage
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
declare function parseZibInstructionsForUse(value: Nullable<Dosage>): ZibInstructionsForUse;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317251
 */
declare const parseZibLivingSituation: (resource: Observation) => {
    identifier: MgoIdentifier[] | undefined;
    status: string | undefined;
    category: MgoCodeableConcept[] | undefined;
    subject: MgoReference | undefined;
    context: MgoReference | undefined;
    valueQuantity: MgoQuantity | undefined;
    effectivePeriod: MgoPeriod | undefined;
    dataAbsentReason: MgoCodeableConcept | undefined;
    method: MgoCodeableConcept | undefined;
    bodySite: MgoCodeableConcept | undefined;
    effectiveDateTime: DateTimeString | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317253
 */
declare function parseZibMedicalDevice(resource: DeviceUseStatement): {
    identifier: parse.MgoIdentifier[] | undefined;
    organization: parse.MgoReference | undefined;
    practitioner: parse.MgoReference | undefined;
    reason: parse.MgoReference | undefined;
    status: string | undefined;
    patient: parse.MgoReference | undefined;
    whenUsed: parse.MgoPeriod | undefined;
    recordedOn: DateTimeString | undefined;
    source: parse.MgoReference | undefined;
    device: parse.MgoReference | undefined;
    bodySite: parse.MgoCodeableConcept | undefined;
    laterality: parse.MgoCodeableConcept | undefined;
    note: parse.MgoAnnotation[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317259
 */
declare function parseZibMedicalDeviceProduct(resource: Device): {
    note: parse.MgoAnnotation[] | undefined;
    patient: parse.MgoReference | undefined;
    expirationDate: DateTimeString | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317273
 */
declare function parseZibMedicationAgreement(resource: MedicationRequest): {
    periodOfUse: parse.MgoPeriod | undefined;
    usageDuration: parse.MgoQuantity | undefined;
    medicationTreatment: parse.MgoIdentifier | undefined;
    stopType: parse.MgoCodeableConcept | undefined;
    repeatPeriodCyclicalSchedule: parse.MgoQuantity | undefined;
    identifier: parse.MgoIdentifier[] | undefined;
    definition: parse.MgoReference[] | undefined;
    basedOn: parse.MgoReference[] | undefined;
    groupIdentifier: parse.MgoIdentifier | undefined;
    status: string | undefined;
    intent: string | undefined;
    category: parse.MgoCodeableConcept | undefined;
    priority: string | undefined;
    medicationReference: parse.MgoReference | undefined;
    note: parse.MgoAnnotation[] | undefined;
    dossageInstruction: ZibInstructionsForUse[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicationAgreement";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279
 */
declare function parseZibMedicationUse(resource: MedicationStatement): {
    asAgreedIndicator: boolean | undefined;
    prescriber: parse.MgoReference | undefined;
    author: parse.MgoReference | undefined;
    medicationTreatment: parse.MgoIdentifier | undefined;
    reasonForChangeOrDiscontinuationOfUse: parse.MgoCodeableConcept | undefined;
    repeatPeriodCyclicalSchedule: parse.MgoQuantity | undefined;
    identifier: parse.MgoIdentifier[] | undefined;
    status: string | undefined;
    category: parse.MgoCodeableConcept | undefined;
    medication: parse.MgoReference | undefined;
    effectiveDuration: parse.MgoQuantity | undefined;
    effectivePeriod: parse.MgoPeriod | undefined;
    dateAsserted: DateTimeString | undefined;
    informationSource: parse.MgoReference | undefined;
    subject: parse.MgoReference | undefined;
    taken: string | undefined;
    reasonCode: parse.MgoCodeableConcept[] | undefined;
    note: parse.MgoAnnotation[] | undefined;
    dosage: ZibInstructionsForUse[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317294
 */
declare function parseZibNutritionAdvice(resource: NutritionOrder): {
    comment: string | undefined;
    identifier: parse.MgoIdentifier[] | undefined;
    status: string | undefined;
    patient: parse.MgoReference | undefined;
    dateTime: DateTimeString | undefined;
    foodPreferenceModifier: parse.MgoCodeableConcept[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317307
 */
declare function parseZibPayer(resource: Coverage): {
    identifier: parse.MgoIdentifier[] | undefined;
    status: string | undefined;
    type: parse.MgoCodeableConcept | undefined;
    policyHolder: parse.MgoReference | undefined;
    subscriber: parse.MgoReference | undefined;
    subscriberId: string | undefined;
    beneficiary: parse.MgoReference | undefined;
    relationship: parse.MgoCodeableConcept | undefined;
    period: parse.MgoPeriod | undefined;
    payor: parse.MgoReference[] | undefined;
    grouping: Grouping;
    dependent: string | undefined;
    sequence: string | undefined;
    order: parse.MgoPositiveInt | undefined;
    network: string | undefined;
    contract: parse.MgoReference[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Payer";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317327
 */
declare function parseZibProblem(resource: Condition): {
    identifier: parse.MgoIdentifier[] | undefined;
    clinicalStatus: string | undefined;
    verificationStatus: string | undefined;
    category: parse.MgoCodeableConcept[] | undefined;
    severity: parse.MgoCodeableConcept | undefined;
    code: parse.MgoCodeableConcept | undefined;
    bodySite: parse.MgoCodeableConcept[] | undefined;
    subject: parse.MgoReference | undefined;
    context: parse.MgoReference | undefined;
    onsetDateTime: DateTimeString | undefined;
    abatementDateTime: DateTimeString | undefined;
    assertedDate: DateTimeString | undefined;
    asserter: parse.MgoReference | undefined;
    stage: Stage;
    evidence: Evidence[] | undefined;
    note: parse.MgoAnnotation[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Problem";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317337
 */
declare function parseZibProcedure(resource: Procedure): {
    performedPeriod: parse.MgoPeriod | undefined;
    bodySite: parse.MgoCodeableConcept[] | undefined;
    bodySiteQualifier: parse.MgoCodeableConcept[] | undefined;
    reasonReference: parse.MgoReference[] | undefined;
    code: parse.MgoCodeableConcept | undefined;
    procedureMethod: parse.MgoCodeableConcept | undefined;
    focalDevice: FocalDevice[] | undefined;
    location: parse.MgoReference | undefined;
    performer: Performer[] | undefined;
    subject: parse.MgoReference | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Procedure";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
declare function parseZibProduct(resource: Medication): {
    description: string | undefined;
    code: parse.MgoCodeableConcept | undefined;
    form: parse.MgoCodeableConcept | undefined;
    ingredient: ZibProductIngredient[] | undefined;
    package: {
        content: {
            item: parse.MgoCodeableConcept | undefined;
            reference: parse.MgoReference | undefined;
        }[] | undefined;
    };
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Product";
};

/**
 * @name HCIM PharmaceuticalProduct
 * @usage zibProduct.ingredient
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
declare function parseZibProductIngredient(value: Nullable<MedicationIngredient>): ZibProductIngredient;

/**
 * @name HCIM PharmaceuticalProduct
 * @usage zibProduct.package
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
declare function parseZibProductPackage(value: Nullable<MedicationPackage>): {
    content: {
        item: parse.MgoCodeableConcept | undefined;
        reference: parse.MgoReference | undefined;
    }[] | undefined;
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317376
 */
declare function parseZibTobaccoUse(resource: Observation): {
    identifier: MgoIdentifier[] | undefined;
    status: string | undefined;
    category: MgoCodeableConcept[] | undefined;
    subject: MgoReference | undefined;
    context: MgoReference | undefined;
    valueQuantity: MgoQuantity | undefined;
    effectivePeriod: MgoPeriod | undefined;
    dataAbsentReason: MgoCodeableConcept | undefined;
    method: MgoCodeableConcept | undefined;
    bodySite: MgoCodeableConcept | undefined;
    comment: string | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317378
 */
declare function parseZibTreatmentDirective(resource: Consent): {
    identifier: parse.MgoIdentifier | undefined;
    status: string | undefined;
    category: parse.MgoCodeableConcept[] | undefined;
    patient: parse.MgoReference | undefined;
    period: parse.MgoPeriod | undefined;
    dateTime: DateTimeString | undefined;
    consentingParty: parse.MgoReference[] | undefined;
    actor: Actor[] | undefined;
    action: parse.MgoCodeableConcept[] | undefined;
    organization: parse.MgoReference[] | undefined;
    sourceAttachment: MgoAttachment;
    sourceIdentifier: parse.MgoIdentifier | undefined;
    sourceReference: parse.MgoReference | undefined;
    policy: Policy[] | undefined;
    policyRule: string | undefined;
    securityLabel: parse.MgoCoding[] | undefined;
    purpose: parse.MgoCoding[] | undefined;
    dataPeriod: parse.MgoPeriod | undefined;
    data: Data[] | undefined;
    except: Except[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective";
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
declare function parseZibVaccination(resource: Immunization): {
    identifier: parse.MgoIdentifier[] | undefined;
    patient: parse.MgoReference | undefined;
    vaccineCode: parse.MgoCodeableConcept | undefined;
    dose: parse.MgoQuantity | undefined;
    vaccinationDate: DateString | undefined;
    practitioner: Actor_2[] | undefined;
    note: parse.MgoAnnotation[] | undefined;
    id: string | undefined;
    referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    resourceType: string | undefined;
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination";
};

declare interface Participant {
    individual: parse.MgoReference | undefined;
}

declare interface Performer {
    actor: parse.MgoReference | undefined;
}

export declare const period: (value: Nullable<Period>) => MgoPeriod | undefined;

declare interface Policy {
    id: parse.MgoString | undefined;
    authority: parse.MgoString | undefined;
    uri: parse.MgoString | undefined;
}

export declare const positiveInt: (value: Nullable<number>) => MgoPositiveInt | undefined;

export declare const quantity: (value: Nullable<Quantity>) => MgoQuantity | undefined;

export declare const range: (value: Nullable<Range_2>) => MgoRange | undefined;

export declare const ratio: (value: Nullable<Ratio>) => MgoRatio | undefined;

export declare const reference: (value: Nullable<Reference>) => MgoReference | undefined;

export declare interface ReferenceValue extends BaseEntry<string> {
    reference: string | undefined;
}

declare function resourceMeta<T extends NictizNlProfile>(resource: Resource, profile: T): {
    readonly id: string | undefined;
    readonly referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
    readonly resourceType: string | undefined;
    readonly profile: T;
};

declare type ReturnTypeParser<Type, F = Type extends ParserKey ? ParseMap[Type] : never> = F extends (...args: any[]) => any ? ReturnType<F> : never;

export declare interface SingleValue extends BaseEntry<string> {
}

declare interface Stage {
    summary: parse_2.MgoCodeableConcept | undefined;
    assessment: parse_2.MgoReference[] | undefined;
}

export declare const string: (value: Nullable<string>) => string | undefined;

declare type UiEntry = SingleValue | MultipleValue | MultipleGroupValue | ReferenceValue;

export declare type UiFunction<Input, Output extends UiEntry | UiEntry[]> = (label: string, value: Nullable<Lossless<Input>>, options?: ValueOptions) => Output;

export declare interface UiSchema {
    label: string | undefined;
    children: UiSchemaGroup[];
}

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function uiSchema(resource: NlCoreObservation | ZibAlcoholUse | ZibDrugUse | ZibLivingSituation | ZibFunctionalOrMentalStatus | ZibTobaccoUse): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317327
 */
declare function uiSchema_10(resource: ZibProblem): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
declare function uiSchema_11(resource: ZibProduct): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317378
 */
declare function uiSchema_12(resource: ZibTreatmentDirective): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function uiSchema_13(resource: ZibLivingSituation): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function uiSchema_14(resource: ZibAlcoholUse): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function uiSchema_15(resource: ZibDrugUse): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function uiSchema_16(resource: ZibFunctionalOrMentalStatus): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function uiSchema_17(resource: ZibTobaccoUse): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317294
 */
declare function uiSchema_18(resource: ZibNutritionAdvice): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
declare function uiSchema_19(resource: ZibMedicalDeviceProduct): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function uiSchema_2(resource: NlCorePatient): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
declare function uiSchema_20(resource: ZibVaccination): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
declare function uiSchema_21(resource: ZibEncounter): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
declare function uiSchema_22(resource: ZibBloodPressure): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
declare function uiSchema_23(resource: ZibBodyWeight): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
declare function uiSchema_24(resource: ZibBodyHeight): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
declare function uiSchema_25(resource: ZibProcedure): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317129
 */
declare function uiSchema_26(resource: ZibAdvanceDirective): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317136
 */
declare function uiSchema_3(resource: ZibAlert): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317124
 */
declare function uiSchema_4(resource: ZibAdministrationAgreement): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317273
 */
declare function uiSchema_5(resource: ZibMedicationAgreement): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317138
 */
declare function uiSchema_6(resource: ZibAllergyIntolerance): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
declare function uiSchema_7(resource: ZibMedicationUse): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317253
 */
declare function uiSchema_8(resource: ZibMedicalDevice): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317307
 */
declare function uiSchema_9(resource: ZibPayer): UiSchema;

declare interface UiSchemaElement {
    label: string;
}

export declare interface UiSchemaGroup extends UiSchemaElement {
    children: UiEntry[];
}

declare function uiSchemaGroup(resource: ZibAdministrationSchedule): UiSchemaGroup;

declare function uiSchemaGroup_2(resource: ZibInstructionsForUse): UiSchemaGroup;

declare function uiSchemaGroup_3(resource: ZibProductIngredient): UiSchemaGroup;

declare function uiSchemaGroup_4(resource: ZibProductPackage): UiSchemaGroup;

declare function uiSchemaGroup_5(resource: Nullable<NlCoreAddress>): UiSchemaGroup;

declare function uiSchemaGroup_6(resource: NlCoreContactpoint): UiSchemaGroup;

declare function uiSchemaGroup_7(resource: Nullable<NlCoreHumanname>): UiSchemaGroup;

export declare const unsignedInt: (value: Nullable<number>) => MgoUnsignedInt | undefined;

export declare interface ValueOptions {
    summary?: boolean;
}

export declare type ZibAdministrationAgreement = ReturnType<typeof parseZibAdministrationAgreement>;

export declare const zibAdministrationAgreement: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-AdministrationAgreement";
    parse: typeof parseZibAdministrationAgreement;
    uiSchema: typeof uiSchema_4;
};

export declare interface ZibAdministrationSchedule {
    duration: parse.MgoDecimal | undefined;
    durationUnit: parse.MgoCode | undefined;
    frequency: parse.MgoInteger | undefined;
    frequencyMax: parse.MgoInteger | undefined;
    period: parse.MgoDecimal | undefined;
    periodUnit: parse.MgoCode | undefined;
    dayOfWeek: parse.MgoCode[] | undefined;
    timeOfDay: parse.MgoDateTime[] | undefined;
    when: parse.MgoCode[] | undefined;
}

export declare const zibAdministrationSchedule: {
    parse: typeof parseZibAdministrationSchedule;
    uiSchemaGroup: typeof uiSchemaGroup;
};

export declare const zibAdministrationScheduleUiSchema: typeof uiSchemaGroup;

export declare type ZibAdvanceDirective = ReturnType<typeof parseZibAdvanceDirective>;

export declare const zibAdvanceDirective: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-AdvanceDirective";
    parse: typeof parseZibAdvanceDirective;
    uiSchema: typeof uiSchema_26;
};

export declare type ZibAlcoholUse = ReturnType<typeof parseZibAlcoholUse>;

export declare const zibAlcoholUse: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-AlcoholUse";
    parse: typeof parseZibAlcoholUse;
    uiSchema: typeof uiSchema_14;
};

export declare type ZibAlert = ReturnType<typeof parseZibAlert>;

export declare const zibAlert: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Alert";
    parse: typeof parseZibAlert;
    uiSchema: typeof uiSchema_3;
};

export declare type ZibAllergyIntolerance = ReturnType<typeof parseZibAllergyIntolerance>;

export declare const zibAllergyIntolerance: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-AllergyIntolerance";
    parse: typeof parseZibAllergyIntolerance;
    uiSchema: typeof uiSchema_6;
};

export declare type ZibBloodPressure = ReturnType<typeof parseZibBloodPressure>;

export declare const zibBloodPressure: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-BloodPressure";
    parse: typeof parseZibBloodPressure;
    uiSchema: typeof uiSchema_22;
};

export declare type ZibBodyHeight = ReturnType<typeof parseZibBodyHeight>;

export declare const zibBodyHeight: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-BodyHeight";
    parse: typeof parseZibBodyHeight;
    uiSchema: typeof uiSchema_24;
};

export declare type ZibBodyWeight = ReturnType<typeof parseZibBodyWeight>;

export declare const zibBodyWeight: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-BodyWeight";
    parse: typeof parseZibBodyWeight;
    uiSchema: typeof uiSchema_23;
};

export declare type ZibDrugUse = ReturnType<typeof parseZibDrugUse>;

export declare const zibDrugUse: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-DrugUse";
    parse: typeof parseZibDrugUse;
    uiSchema: typeof uiSchema_15;
};

export declare type ZibEncounter = ReturnType<typeof parseZibEncounter>;

export declare const zibEncounter: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Encounter";
    parse: typeof parseZibEncounter;
    uiSchema: typeof uiSchema_21;
};

export declare type ZibFunctionalOrMentalStatus = ReturnType<typeof parseZibFunctionalOrMentalStatus>;

export declare const zibFunctionalOrMentalStatus: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-FunctionalOrMentalStatus";
    parse: typeof parseZibFunctionalOrMentalStatus;
    uiSchema: typeof uiSchema_16;
};

export declare interface ZibInstructionsForUse {
    additionalInstruction: parse.MgoCodeableConcept[] | undefined;
    asNeeded: parse.MgoCodeableConcept | undefined;
    doseQuantity: parse.MgoQuantity | undefined;
    doseRange: parse.MgoRange | undefined;
    maxDosePerPeriod: parse.MgoRatio | undefined;
    rateRatio: parse.MgoRatio | undefined;
    rateRange: parse.MgoRange | undefined;
    rateQuantity: parse.MgoQuantity | undefined;
    timing: ZibAdministrationSchedule;
}

export declare const zibInstructionsForUse: {
    parse: typeof parseZibInstructionsForUse;
    uiSchemaGroup: typeof uiSchemaGroup_2;
};

export declare type ZibLivingSituation = ReturnType<typeof parseZibLivingSituation>;

export declare const zibLivingSituation: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation";
    parse: (resource: Observation) => {
        identifier: MgoIdentifier[] | undefined;
        status: string | undefined;
        category: MgoCodeableConcept[] | undefined;
        subject: MgoReference | undefined;
        context: MgoReference | undefined;
        valueQuantity: MgoQuantity | undefined;
        effectivePeriod: MgoPeriod | undefined;
        dataAbsentReason: MgoCodeableConcept | undefined;
        method: MgoCodeableConcept | undefined;
        bodySite: MgoCodeableConcept | undefined;
        effectiveDateTime: DateTimeString | undefined;
        comment: string | undefined;
        id: string | undefined;
        referenceId: `undefined/${string}` | `${string}/undefined` | `${string}/${string}`;
        resourceType: string | undefined;
        profile: "http://nictiz.nl/fhir/StructureDefinition/zib-LivingSituation";
    };
    uiSchema: typeof uiSchema_13;
};

export declare type ZibMedicalDevice = ReturnType<typeof parseZibMedicalDevice>;

export declare const zibMedicalDevice: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDevice";
    parse: typeof parseZibMedicalDevice;
    uiSchema: typeof uiSchema_8;
};

export declare type ZibMedicalDeviceProduct = ReturnType<typeof parseZibMedicalDeviceProduct>;

export declare const zibMedicalDeviceProduct: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicalDeviceProduct";
    parse: typeof parseZibMedicalDeviceProduct;
    uiSchema: typeof uiSchema_19;
};

export declare type ZibMedicationAgreement = ReturnType<typeof parseZibMedicationAgreement>;

export declare const zibMedicationAgreement: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicationAgreement";
    parse: typeof parseZibMedicationAgreement;
    uiSchema: typeof uiSchema_5;
};

export declare type ZibMedicationUse = ReturnType<typeof parseZibMedicationUse>;

export declare const zibMedicationUse: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse";
    parse: typeof parseZibMedicationUse;
    uiSchema: typeof uiSchema_7;
};

export declare type ZibNutritionAdvice = ReturnType<typeof parseZibNutritionAdvice>;

export declare const zibNutritionAdvice: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice";
    parse: typeof parseZibNutritionAdvice;
    uiSchema: typeof uiSchema_18;
};

export declare type ZibPayer = ReturnType<typeof parseZibPayer>;

export declare const zibPayer: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Payer";
    parse: typeof parseZibPayer;
    uiSchema: typeof uiSchema_9;
};

export declare type ZibProblem = ReturnType<typeof parseZibProblem>;

export declare const zibProblem: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Problem";
    parse: typeof parseZibProblem;
    uiSchema: typeof uiSchema_10;
};

export declare type ZibProcedure = ReturnType<typeof parseZibProcedure>;

export declare const zibProcedure: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Procedure";
    parse: typeof parseZibProcedure;
    uiSchema: typeof uiSchema_25;
};

export declare type ZibProduct = ReturnType<typeof parseZibProduct>;

export declare const zibProduct: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Product";
    parse: typeof parseZibProduct;
    uiSchema: typeof uiSchema_11;
};

export declare interface ZibProductIngredient {
    item: parse.MgoCodeableConcept | undefined;
    amount: parse.MgoRatio | undefined;
}

export declare const zibProductIngredient: {
    parse: typeof parseZibProductIngredient;
    uiSchemaGroup: typeof uiSchemaGroup_3;
};

export declare interface ZibProductPackage {
    content: ZibProductPackageContent[] | undefined;
}

export declare const zibProductPackage: {
    parse: typeof parseZibProductPackage;
    uiSchemaGroup: typeof uiSchemaGroup_4;
};

declare interface ZibProductPackageContent {
    item: parse.MgoCodeableConcept | undefined;
    reference: parse.MgoReference | undefined;
}

export declare type ZibTobaccoUse = ReturnType<typeof parseZibTobaccoUse>;

export declare const zibTobaccoUse: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-TobaccoUse";
    parse: typeof parseZibTobaccoUse;
    uiSchema: typeof uiSchema_17;
};

export declare type ZibTreatmentDirective = ReturnType<typeof parseZibTreatmentDirective>;

export declare const zibTreatmentDirective: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective";
    parse: typeof parseZibTreatmentDirective;
    uiSchema: typeof uiSchema_12;
};

export declare type ZibVaccination = ReturnType<typeof parseZibVaccination>;

export declare const zibVaccination: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Vaccination";
    parse: typeof parseZibVaccination;
    uiSchema: typeof uiSchema_20;
};

export { }
