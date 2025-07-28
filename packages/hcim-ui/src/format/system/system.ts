import { type MgoCodingProps } from '@minvws/mgo-hcim-parse';
import { type FormatFunction, type WithUiContext } from '../../types/index.js';
import { systemCode } from '../systemCode/systemCode.js';

export const system: WithUiContext<FormatFunction<MgoCodingProps>> = (context) => (value) => {
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
