import { parse } from '../../../../../parse';
import { oneOfValueX } from '../../../../../parse/helpers';
import { type Nullable } from '../../../../../types/Nullable';
import { map } from '../../../../../utils';
import { type ImmunizationProtocolApplied } from 'fhir/r4';

export interface ProtocolApplied {
    authority: parse.MgoReference | undefined;
    targetDisease: parse.MgoCodeableConcept[] | undefined; // imm-dataelement-159
    doseNumberPositiveInt?: parse.MgoPositiveInt;
    doseNumberString?: parse.MgoString;
    seriesDosesPositiveInt?: parse.MgoPositiveInt;
    seriesDosesString?: parse.MgoString;
}

export function parseProtocolApplied(
    value: Nullable<ImmunizationProtocolApplied>
): ProtocolApplied {
    return {
        authority: parse.reference(value?.authority),
        targetDisease: map(value?.targetDisease, parse.codeableConcept),
        ...oneOfValueX(value, ['string', 'positiveInt'], 'doseNumber'),
        ...oneOfValueX(value, ['string', 'positiveInt'], 'seriesDoses'),
    };
}
