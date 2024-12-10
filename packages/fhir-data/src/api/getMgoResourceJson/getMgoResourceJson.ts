import { losslessParse, losslessStringify } from '../../parse/lossless/lossless';
import { FhirVersion } from '../../types/Fhir';
import { type FhirResource } from '../../types/FhirRX';
import { isFhirResource } from '../../utils';
import { getMgoResource } from '../getMgoResource/getMgoResource';

export function getMgoResourceJson(
    fhirResourceJson: string,
    fhirVersion: FhirVersion = FhirVersion.R3
) {
    const fhirResource = losslessParse<FhirResource>(fhirResourceJson);

    if (!isFhirResource(fhirResource)) {
        throw new Error(
            `input does not seem to be a valid Fhir Resource. Received resourceType: "${(fhirResource as FhirResource)?.resourceType}"`
        );
    }

    const result = getMgoResource(fhirResource, fhirVersion);
    return losslessStringify(result);
}
