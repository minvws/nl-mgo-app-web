import type * as Fhir from '../../fhir';
import { losslessParse, losslessStringify } from '../../parse/lossless/lossless';
import { isFhirResource } from '../../utils';
import { getMgoResource } from '../getMgoResource/getMgoResource';

export function getMgoResourceJson(fhirResourceJson: string, formatResponse: boolean = false) {
    const fhirResource = losslessParse<Fhir.FhirResource>(fhirResourceJson);

    if (!isFhirResource(fhirResource)) {
        throw new Error(
            `input does not seem to be a valid Fhir Resource. Received resourceType: "${(fhirResource as Fhir.FhirResource)?.resourceType}"`
        );
    }

    const result = getMgoResource(fhirResource);
    return losslessStringify(result, formatResponse);
}
