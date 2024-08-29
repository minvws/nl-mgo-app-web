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

    const uiSchema = getUiSchema(mgoResource);
    return losslessStringify(uiSchema, formatResponse);
}
