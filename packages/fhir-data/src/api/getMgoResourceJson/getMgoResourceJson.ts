import { losslessParse, losslessStringify } from '../../parse/lossless/lossless';
import { FhirVersion } from '../../types/Fhir';
import { type FhirResource } from '../../types/FhirRX';
import { isFhirResource } from '../../utils';
import { getMgoResource } from '../getMgoResource/getMgoResource';
import { type FhirResource as FhirResourceR3 } from 'fhir/r3';

export function getMgoResourceJson(fhirResourceJson: string, formatResponse: boolean = false) {
    const fhirResource = losslessParse<FhirResource>(fhirResourceJson);

    if (!isFhirResource(fhirResource)) {
        throw new Error(
            `input does not seem to be a valid Fhir Resource. Received resourceType: "${(fhirResource as FhirResource)?.resourceType}"`
        );
    }

    const result = getMgoResource(fhirResource as FhirResourceR3, FhirVersion.R3);
    return losslessStringify(result, formatResponse);
}
