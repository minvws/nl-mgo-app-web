import { Address } from 'fhir/r3';
import { Annotation } from 'fhir/r3';
import { CodeableConcept } from 'fhir/r3';
import { Coding } from 'fhir/r3';
import { Consent } from 'fhir/r3';
import { ContactPoint } from 'fhir/r3';
import { Coverage } from 'fhir/r3';
import { DomainResource } from 'fhir/r3';
import { Dosage } from 'fhir/r3';
import { Duration } from 'fhir/r3';
import { Element as Element_2 } from 'fhir/r3';
import { HumanName } from 'fhir/r3';
import { Identifier } from 'fhir/r3';
import { LosslessNumber } from 'lossless-json';
import { Medication } from 'fhir/r3';
import { MedicationIngredient } from 'fhir/r3';
import { MedicationPackage } from 'fhir/r3';
import { MedicationStatement } from 'fhir/r3';
import { Patient } from 'fhir/r3';
import { Period } from 'fhir/r3';
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

export declare const duration: (value: Nullable<Duration>) => MgoQuantity | undefined;

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
    'zib-MedicationUse-AsAgreedIndicator': "boolean";
    'zib-MedicationUse-Prescriber': "reference";
    'zib-MedicationUse-Author': "reference";
    'zib-MedicationUse-ReasonForChangeOrDiscontinuationOfUse': "codeableConcept";
    'zib-Medication-MedicationTreatment': "identifier";
    'zib-Medication-RepeatPeriodCyclicalSchedule': "duration";
    'zib-MedicationUse-Duration': "duration";
    'zib-Product-Description': "string";
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

export declare type NlCorePatient = ReturnType<typeof parseNlCorePatient>;

export declare const nlCorePatient: {
    profile: "http://fhir.nl/fhir/StructureDefinition/nl-core-patient";
    parse: typeof parseNlCorePatient;
    uiSchema: typeof uiSchema_3;
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
 * @name HCIM AdministrationSchedule
 * @usage zibInstructionsForUse.timing
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317128
 */
declare function parseZibAdministrationSchedule(value: Nullable<Timing>): ZibAdministrationSchedule;

/**
 * @name HCIM InstructionsForUse
 * @usage zibMedicationUse.dosage
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317236
 */
declare function parseZibInstructionsForUse(value: Nullable<Dosage>): ZibInstructionsForUse;

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

export declare const string: (value: Nullable<string>) => string | undefined;

declare type UiEntry = SingleValue | MultipleValue | MultipleGroupValue | ReferenceValue;

export declare type UiFunction<Input, Output extends UiEntry | UiEntry[]> = (label: string, value: Nullable<Lossless<Input>>, options?: ValueOptions) => Output;

export declare interface UiSchema {
    label: string | undefined;
    children: UiSchemaGroup[];
}

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
declare function uiSchema(resource: ZibMedicationUse): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
declare function uiSchema_2(resource: ZibProduct): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
declare function uiSchema_3(resource: NlCorePatient): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317378
 */
declare function uiSchema_4(resource: ZibTreatmentDirective): UiSchema;

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317307
 */
declare function uiSchema_5(resource: ZibPayer): UiSchema;

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

export declare type ZibMedicationUse = ReturnType<typeof parseZibMedicationUse>;

export declare const zibMedicationUse: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse";
    parse: typeof parseZibMedicationUse;
    uiSchema: typeof uiSchema;
};

export declare type ZibPayer = ReturnType<typeof parseZibPayer>;

export declare const zibPayer: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Payer";
    parse: typeof parseZibPayer;
    uiSchema: typeof uiSchema_5;
};

export declare type ZibProduct = ReturnType<typeof parseZibProduct>;

export declare const zibProduct: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-Product";
    parse: typeof parseZibProduct;
    uiSchema: typeof uiSchema_2;
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

export declare type ZibTreatmentDirective = ReturnType<typeof parseZibTreatmentDirective>;

export declare const zibTreatmentDirective: {
    profile: "http://nictiz.nl/fhir/StructureDefinition/zib-TreatmentDirective";
    parse: typeof parseZibTreatmentDirective;
    uiSchema: typeof uiSchema_4;
};

export { }
