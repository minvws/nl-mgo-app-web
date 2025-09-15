import { type Address } from '@minvws/mgo-fhir/r4';
import { parse, type MgoCode, type MgoElementMeta, type MgoString } from '@minvws/mgo-hcim-parse';
import { map, type Nullable } from '@minvws/mgo-utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-AddressInformation'; // NOSONAR

export type R4NlCoreAddressInformation = MgoElementMeta<typeof profile> & {
    use: MgoCode | undefined;
    type: MgoCode | undefined;
    line:
        | {
              streetName: MgoString | undefined;
              houseNumber: MgoString | undefined;
              houseNumberLetter: MgoString | undefined;
              houseNumberAddition: MgoString | undefined;
              houseNumberIndiciation: MgoString | undefined;
              additionalInformation: MgoString | undefined;
              countryCode: MgoString | undefined;
          }[]
        | undefined;
    city: MgoString | undefined;
    district: MgoString | undefined;
    postalCode: MgoString | undefined;
    country: {
        countryCode: parse.MgoCodeableConcept | undefined;
    };
};

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628321
 */
export function parseNlCoreAddressInformation(
    value: Nullable<Address>
): R4NlCoreAddressInformation {
    return {
        _profile: profile,
        use: parse.code(value?.use),
        type: parse.code(value?.type),
        line: map(value?._line, (line) => ({
            streetName: parse.extension(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetName', // NOSONAR
                'string'
            ),
            houseNumber: parse.extension(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber', // NOSONAR
                'string'
            ),
            houseNumberLetter: parse.extension(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-buildingNumberSuffix', // NOSONAR
                'string'
            ),
            houseNumberAddition: parse.extension(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-buildingNumberSuffix', // NOSONAR
                'string'
            ),
            houseNumberIndication: parse.extension(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-additionalLocator', // NOSONAR
                'string'
            ),
            additionalInformation: parse.extension(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-unitID', // NOSONAR
                'string'
            ),
        })),
        city: parse.string(value?.city),
        district: parse.string(value?.district),
        postalCode: parse.string(value?.postalCode),
        country: {
            countryCode: parse.extension(
                value?._country,
                'http://nictiz.nl/fhir/StructureDefinition/ext-CodeSpecification', // NOSONAR
                'codeableConcept'
            ),
        },
    };
}
