import { type MgoCodingProps } from '../../../parse/type/coding/coding';
import { type FormatFunction, type WithUiHelperContext } from '../../types';
import { systemCode } from '../systemCode/systemCode';

export const system: WithUiHelperContext<FormatFunction<MgoCodingProps>> = (context) => (value) => {
    const { isSummary, formatMessage } = context;
    const { display, code, system } = value ?? {};

    const systemCodeTranslation = systemCode(context)(value);

    if (isSummary) {
        return systemCodeTranslation;
    }

    let codeInSystemString;

    if (code && system) {
        codeInSystemString = formatMessage('fhir.code_in_system', {
            code,
            system,
        });
    } else {
        codeInSystemString = system ?? code;
    }

    const systemString =
        `${display ?? ''} ${codeInSystemString ? '(' + codeInSystemString + ')' : ''}`.trim();
    return systemString === '' ? undefined : systemString;
};
