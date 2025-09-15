import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test } from 'vitest';
import { organization } from './organization.js';

test('creates an organization element for the summary ui schema', () => {
    const name = faker.lorem.word();

    const organizationElement = organization(faker.ui.context(), { name });
    expect(organizationElement).toMatchObject({
        type: 'SINGLE_VALUE',
        label: testMessage('summary.organization'),
        display: name,
    });
});
