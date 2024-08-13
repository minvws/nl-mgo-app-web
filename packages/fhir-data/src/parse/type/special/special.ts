import { type Reference } from '../../../fhir';
import { deepReplaceUndefined } from '../../helpers';
import { addNullishReturn } from '../../helpers/addNullishReturn/addNullishReturn';

export const reference = addNullishReturn((value: Reference) => {
    const { reference, display } = value;
    return deepReplaceUndefined({
        reference,
        display,
    });
});
