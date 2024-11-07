import { losslessParse, losslessStringify } from '../../parse/lossless/lossless';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource';
import { getUiSchema } from '../getUiSchema/getUiSchema';
import { type MgoResource } from '../resources/resources';

export function getUiSchemaJson(mgoResourceJson: string, formatResponse: boolean = false) {
    const mgoResource = losslessParse<MgoResource>(mgoResourceJson);

    if (!isMgoResource(mgoResource)) {
        throw new Error(
            `input does not seem to be a valid MGO Resource. Received MGO resource profile: "${(mgoResource as MgoResource)?.profile}"`
        );
    }

    // There seems to be a problem with the Lossless type defintion.
    // For now we cast the resource in this case to any to be able to build the bundle.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uiSchema = getUiSchema(mgoResource as any);
    return losslessStringify(uiSchema, formatResponse);
}
