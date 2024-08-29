import type * as Fhir from '../../fhir';
import { losslessParse, losslessStringify } from '../../parse/lossless/lossless';
import { isFhirResource } from '../../utils';
import { getBundleResources } from '../getBundleResources/getBundleResources';

export function getBundleResourcesJson(fhirBundleJson: string, formatResponse: boolean = false) {
    const fhirBundle = losslessParse<Fhir.FhirResource>(fhirBundleJson);

    if (!isFhirResource(fhirBundle, 'Bundle')) {
        throw new Error(
            `input does not seem to be a Fhir Bundle. Received resourceType: "${(fhirBundle as Fhir.FhirResource)?.resourceType}"`
        );
    }

    const resources = getBundleResources(fhirBundle);
    return losslessStringify(resources, formatResponse);
}
