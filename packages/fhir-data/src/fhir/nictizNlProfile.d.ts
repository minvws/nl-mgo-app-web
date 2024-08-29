export type NictizNlProfile =
    | `http://fhir.nl/fhir/StructureDefinition/nl-core-${string}`
    | `http://nictiz.nl/fhir/StructureDefinition/zib-${string}`
    | `http://nictiz.nl/fhir/StructureDefinition/gp-${string}`;
