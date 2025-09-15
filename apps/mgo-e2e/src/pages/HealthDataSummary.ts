import { fhirMessage, type FhirMessagesIds } from '@minvws/mgo-intl/test/shared';
import { type Page } from '@playwright/test';
import { HealthDataDetailPage } from './HealthDataDetail';

type ShowDetailsLabel =
    Extract<
        FhirMessagesIds,
        `summary.${string}.show_details`
    > extends `summary.${infer R}.show_details`
        ? R
        : never;

export class HealthDataSummaryPage extends HealthDataDetailPage {
    constructor(page: Page) {
        super(page);
    }

    buttonDetails(label: ShowDetailsLabel) {
        return this.page.getByRole('link', {
            name: fhirMessage(`summary.${label}.show_details`),
        });
    }
}
