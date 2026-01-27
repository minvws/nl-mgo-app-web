import { SchemaContext } from '../../../api/schemaContext/schemaContext.js';
import { SummaryElementFunction } from '../../../resourceTypes.js';
import { NlCoreHumanname } from './nlCoreHumanname.js';

const i18n = 'r3.nl_core_humanname';

export const nlCoreHumannameSummary: SummaryElementFunction<
    NlCoreHumanname,
    SchemaContext<'R3'>
> = (resource, context) => {
    const { ui } = context;

    return [ui.string(`${i18n}.text`, resource?.text)];
};
