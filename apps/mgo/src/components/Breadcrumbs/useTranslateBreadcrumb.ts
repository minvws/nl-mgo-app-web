import { useHealthUiSchema } from '$/hooks';
import { useIntl } from '$/intl';
import { useParamsData } from '$/routing';
import { AppMessagesIds } from '@minvws/mgo-intl';

export const missingBreadcrumbLabel = '-';

export function useTranslateBreadcrumb() {
    const { formatMessage, hasMessage } = useIntl();
    const { resource, healthCategory, organization } = useParamsData();
    const { getSummary } = useHealthUiSchema();

    const translateBreadcrumb = (breadcrumb: string): string => {
        switch (breadcrumb) {
            case ':organizationSlug':
                return organization?.name || missingBreadcrumbLabel;
            case ':healthCategorySlug':
                if (!healthCategory) {
                    return missingBreadcrumbLabel;
                }
                return formatMessage(healthCategory.heading as AppMessagesIds);
            case ':resourceSlug':
                return getSummary(resource)?.label || missingBreadcrumbLabel;
            default:
                if (hasMessage(breadcrumb)) {
                    return formatMessage(breadcrumb);
                }
                return missingBreadcrumbLabel;
        }
    };

    return { translateBreadcrumb };
}
