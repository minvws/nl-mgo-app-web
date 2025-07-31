import { type ContactPoint } from '@minvws/mgo-fhir/r3';
import { parse, type MgoElementMeta } from '@minvws/mgo-hcim-parse';
import { type Nullable } from '@minvws/mgo-utils';

/*
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317022
 */
export type NlCoreContactpoint = MgoElementMeta<typeof profile> & {
    telecomType: parse.MgoCodeableConcept | undefined;
    system: parse.MgoCode | undefined;
    value: parse.MgoString | undefined;
    use: parse.MgoCode | undefined;
};

const profile = 'http://fhir.nl/fhir/StructureDefinition/nl-core-contactpoint'; // NOSONAR

/**
 * @name HCIM NlCoreContactpoint
 * @usage Patient.telecom
 * @see https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317022
 */
export function parseNlCoreContactpoint(value: Nullable<ContactPoint>): NlCoreContactpoint {
    return {
        _profile: profile,

        // HCIM ContactInformation-v1.0(2017EN)
        telecomType: parse.extension(
            value,
            'http://nictiz.nl/fhir/StructureDefinition/zib-ContactInformation-TelecomType', // NOSONAR
            'codeableConcept'
        ),
        system: parse.code(value?.system),
        value: parse.string(value?.value),
        use: parse.code(value?.use),
    };
}
