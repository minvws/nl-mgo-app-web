import { type Address } from '@minvws/mgo-fhir/r3';
import { parse, type MgoElementMeta } from '@minvws/mgo-hcim-parse';
import { map, type Nullable } from '@minvws/mgo-utils';

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-address'; // NOSONAR

export type NlCoreAddress = MgoElementMeta<typeof profile> & {
    addressType: parse.MgoCodeableConcept | undefined;
    official: parse.MgoBoolean | undefined;
    use: parse.MgoCode | undefined;
    type: parse.MgoCode | undefined;
    line:
        | {
              streetName: parse.MgoString | undefined;
              houseNumber: parse.MgoString | undefined;
              buildingNumberSuffix: parse.MgoString | undefined;
              unitId: parse.MgoString | undefined;
              additionalLocator: parse.MgoString | undefined;
          }[]
        | undefined;
    city: parse.MgoString | undefined;
    district: parse.MgoString | undefined;
    postalCode: parse.MgoString | undefined;
    country: parse.MgoString | undefined;
};

/**
 * @name HCIM NlCoreAddress
 * @usage Patient.address
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317015
 */
export function parseNlCoreAddress(value: Nullable<Address>): NlCoreAddress {
    return {
        _profile: profile,

        // HCIM AddressInformation-v1.0(2017EN)
        addressType: parse.extension(
            value,
            'http://nictiz.nl/fhir/StructureDefinition/zib-AddressInformation-AddressType', // NOSONAR
            'codeableConcept'
        ),
        official: parse.extension(
            value,
            'http://fhir.nl/fhir/StructureDefinition/nl-core-address-official', // NOSONAR
            'boolean'
        ),
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
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-houseNumber', // NOSONAR,
                'string'
            ),
            buildingNumbersuffix: parse.extensionMultiple(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-buildingNumberSuffix', // NOSONAR,
                'string'
            ),
            unitID: parse.extension(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-unitID', // NOSONAR,
                'string'
            ),
            additionalLocator: parse.extension(
                line,
                'http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-additionalLocator', // NOSONAR,
                'string'
            ),
        })),
        city: parse.string(value?.city),
        district: parse.string(value?.district),
        postalCode: parse.string(value?.postalCode),
        country: parse.string(value?.country),
    };
}
