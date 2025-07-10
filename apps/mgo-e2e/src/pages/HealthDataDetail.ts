import { appMessage, fhirMessage, type FhirMessagesIds } from '@minvws/mgo-intl/test';
import { type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';

export class HealthDataDetailPage extends AbstractPage {
    constructor(page: Page) {
        super(page);
    }

    readonly buttonBack = this.page.getByRole('button', {
        name: appMessage('common.previous'),
    });

    heading(name: string) {
        return this.page.getByRole('heading', {
            level: 1,
            name,
        });
    }

    dataList(label: FhirMessagesIds) {
        return this.page.getByLabel(fhirMessage(label));
    }

    protected getDataListContents() {
        const dataLists = this.page.locator('dl');
        return dataLists.evaluateAll((dls) => {
            return dls.map((dl) => {
                const groupLabelId = dl.getAttribute('aria-labelledby');
                const groupLabel = groupLabelId
                    ? document.getElementById(groupLabelId)?.textContent
                    : null;
                const dds = dl.querySelectorAll('dd');

                return {
                    label: groupLabel,
                    children: Array.from(dds).map((dd) => {
                        const labelId = dd.getAttribute('aria-labelledby');
                        const label = labelId
                            ? document.getElementById(labelId)?.textContent
                            : null;
                        return {
                            label,
                            value: dd.textContent,
                        };
                    }),
                };
            });
        });
    }

    async getDataListContentsJson() {
        const dataListContents = await this.getDataListContents();
        return JSON.stringify(dataListContents, null, 2);
    }
}
