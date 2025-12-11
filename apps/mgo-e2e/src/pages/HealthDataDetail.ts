import { appMessage, fhirMessage, type FhirMessagesIds } from '@minvws/mgo-intl/test/shared';
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
            function getVisibleText(el: HTMLElement | null) {
                if (!el) return '';

                const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
                let text = '';

                function isHidden(node: HTMLElement | null) {
                    let current: HTMLElement | null = node;
                    while (current && current.nodeType === Node.ELEMENT_NODE) {
                        const style = window.getComputedStyle(current);
                        if (
                            style.display === 'none' ||
                            style.visibility === 'hidden' ||
                            style.opacity === '0' ||
                            current.hasAttribute('hidden') ||
                            current.getAttribute('aria-hidden') === 'true'
                        ) {
                            return true;
                        }
                        current = current.parentElement;
                    }
                    return false;
                }

                while (walker.nextNode()) {
                    const node = walker.currentNode;
                    if (!isHidden(node.parentElement)) {
                        text += node.textContent;
                    }
                }

                return text.trim();
            }

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
                            ? getVisibleText(document.getElementById(labelId))
                            : null;
                        return {
                            label,
                            value: getVisibleText(dd),
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
