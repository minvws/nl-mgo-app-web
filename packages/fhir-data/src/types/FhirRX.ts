import type {
    Annotation as AnnotationR3,
    BackboneElement as BackboneElementR3,
    Bundle as BundleR3,
    CodeableConcept as CodeableConceptR3,
    Coding as CodingR3,
    DomainResource as DomainResourceR3,
    Duration as DurationR3,
    Element as ElementR3,
    FhirResource as FhirResourceR3,
    HumanName as HumanNameR3,
    Identifier as IdentifierR3,
    ObservationComponent as ObservationComponentR3,
    Period as PeriodR3,
    Quantity as QuantityR3,
    Range as RangeR3,
    Ratio as RatioR3,
    Reference as ReferenceR3,
    Resource as ResourceR3,
} from 'fhir/r3';

import type {
    Annotation as AnnotationR4,
    BackboneElement as BackboneElementR4,
    Bundle as BundleR4,
    CodeableConcept as CodeableConceptR4,
    Coding as CodingR4,
    DomainResource as DomainResourceR4,
    Duration as DurationR4,
    Element as ElementR4,
    FhirResource as FhirResourceR4,
    HumanName as HumanNameR4,
    Identifier as IdentifierR4,
    ObservationComponent as ObservationComponentR4,
    Period as PeriodR4,
    Quantity as QuantityR4,
    Range as RangeR4,
    Ratio as RatioR4,
    Reference as ReferenceR4,
    Resource as ResourceR4,
} from 'fhir/r4';

/**
 * Parser functions (and some helpers) need to be able to handle both R3 and R4 types
 * In this file we list R3/R4 unions that are used by these functions.
 */

export type Quantity = QuantityR3 | QuantityR4;
export type Annotation = AnnotationR3 | AnnotationR4;
export type CodeableConcept = CodeableConceptR3 | CodeableConceptR4;
export type Coding = CodingR3 | CodingR4;
export type Duration = DurationR3 | DurationR4;
export type Identifier = IdentifierR3 | IdentifierR4;
export type Period = PeriodR3 | PeriodR4;
export type Range = RangeR3 | RangeR4;
export type Ratio = RatioR3 | RatioR4;
export type HumanName = HumanNameR3 | HumanNameR4;
export type BackboneElement = BackboneElementR3 | BackboneElementR4;
export type Reference = ReferenceR3 | ReferenceR4;

export type FhirResource = FhirResourceR3 | FhirResourceR4;
export type Bundle = BundleR3 | BundleR4;

export type ObservationComponent = ObservationComponentR3 | ObservationComponentR4;
export type DomainResource = DomainResourceR3 | DomainResourceR4;
export type Element = ElementR3 | ElementR4;
export type Resource = ResourceR3 | ResourceR4;

export type ResourceType = FhirResource['resourceType'];
export type ResourceTypeR3 = FhirResourceR3['resourceType'];
export type ResourceTypeR4 = FhirResourceR4['resourceType'];
export type ResourceByType<T extends ResourceType> = Extract<FhirResource, { resourceType: T }>;
export type ResourceByTypeR3<T extends ResourceTypeR3> = Extract<
    FhirResourceR3,
    { resourceType: T }
>;
export type ResourceByTypeR4<T extends ResourceTypeR4> = Extract<
    FhirResourceR4,
    { resourceType: T }
>;
