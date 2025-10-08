import type {
    Address as AddressR3,
    Annotation as AnnotationR3,
    Attachment as AttachmentR3,
    BackboneElement as BackboneElementR3,
    Binary as BinaryR3,
    CodeableConcept as CodeableConceptR3,
    Coding as CodingR3,
    ContactPoint as ContactPointR3,
    DomainResource as DomainResourceR3,
    Duration as DurationR3,
    Element as ElementR3,
    HumanName as HumanNameR3,
    Identifier as IdentifierR3,
    ObservationComponent as ObservationComponentR3,
    Observation as ObservationR3,
    Period as PeriodR3,
    Quantity as QuantityR3,
    Range as RangeR3,
    Ratio as RatioR3,
    Reference as ReferenceR3,
    Resource as ResourceR3,
    SampledData as SampledDataR3Original,
    StructureDefinition as StructureDefinitionR3,
    Timing as TimingR3,
} from './r3.js';

import type {
    Address as AddressR4,
    Annotation as AnnotationR4,
    Attachment as AttachmentR4,
    BackboneElement as BackboneElementR4,
    Binary as BinaryR4,
    CodeableConcept as CodeableConceptR4,
    Coding as CodingR4,
    ContactPoint as ContactPointR4,
    DomainResource as DomainResourceR4,
    Duration as DurationR4,
    Element as ElementR4,
    HumanName as HumanNameR4,
    Identifier as IdentifierR4,
    ObservationComponent as ObservationComponentR4,
    Observation as ObservationR4,
    Period as PeriodR4,
    Quantity as QuantityR4,
    Range as RangeR4,
    Ratio as RatioR4,
    Reference as ReferenceR4,
    Resource as ResourceR4,
    SampledData as SampledDataR4Original,
    StructureDefinition as StructureDefinitionR4,
    Timing as TimingR4,
} from './r4.js';

import type { OverrideProperties } from 'type-fest';

export type Quantity = QuantityR3 | QuantityR4;
export type Address = AddressR3 | AddressR4;
export type Annotation = AnnotationR3 | AnnotationR4;
export type CodeableConcept = CodeableConceptR3 | CodeableConceptR4;
export type Coding = CodingR3 | CodingR4;
export type Duration = DurationR3 | DurationR4;
export type Identifier = IdentifierR3 | IdentifierR4;
export type Period = PeriodR3 | PeriodR4;
export type Range = RangeR3 | RangeR4;
export type Ratio = RatioR3 | RatioR4;
export type HumanName = HumanNameR3 | HumanNameR4;
export type ContactPoint = ContactPointR3 | ContactPointR4;
export type BackboneElement = BackboneElementR3 | BackboneElementR4;
export type Reference = ReferenceR3 | ReferenceR4;
export type Attachment = AttachmentR3 | AttachmentR4;
export type Timing = TimingR3 | TimingR4;
export type Binary = BinaryR3 | BinaryR4;

export type ObservationComponent = ObservationComponentR3 | ObservationComponentR4;
export type DomainResource = DomainResourceR3 | DomainResourceR4;
export type Element = ElementR3 | ElementR4;
export type Resource = ResourceR3 | ResourceR4;
export type StructureDefinition = StructureDefinitionR3 | StructureDefinitionR4;
export type Observation = ObservationR3 | ObservationR4;

export type SimpleQuantityR3 = Omit<QuantityR3, 'comparator'>;
export type SimpleQuantityR4 = Omit<QuantityR4, 'comparator'>;
export type SimpleQuantity = SimpleQuantityR3 | SimpleQuantityR4;

type SampledDataR3 = OverrideProperties<SampledDataR3Original, { origin: SimpleQuantityR3 }>;
type SampledDataR4 = OverrideProperties<SampledDataR4Original, { origin: SimpleQuantityR4 }>;

export type SampledData = SampledDataR3 | SampledDataR4;
