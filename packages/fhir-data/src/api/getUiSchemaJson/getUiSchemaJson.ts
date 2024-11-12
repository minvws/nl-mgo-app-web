import { losslessParse, losslessStringify } from '../../parse/lossless/lossless';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource';
import { getUiSchema } from '../getUiSchema/getUiSchema';
import { type MgoResourceR4, type MgoResourceR3 } from '../resources/resources';

export function getUiSchemaJson(mgoResourceJson: string, formatResponse: boolean = false) {
    const mgoResource = losslessParse<MgoResourceR3 | MgoResourceR4>(mgoResourceJson);

    if (!isMgoResource(mgoResource)) {
        throw new Error(
            `input does not seem to be a valid MGO Resource. Received MGO resource profile: "${mgoResource?.profile}"`
        );
    }

    const uiSchema = getUiSchema(mgoResource as MgoResourceR3 | MgoResourceR4);
    return losslessStringify(uiSchema, formatResponse);
}
