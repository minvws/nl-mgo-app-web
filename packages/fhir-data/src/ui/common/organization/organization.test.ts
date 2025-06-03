import { faker, testUiSchemaContext } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { expect, test } from 'vitest';
import { organization } from './organization';

test('creates an organization element for the summary ui schema', () => {
    const name = faker.lorem.word();
    const uiSchemaContext = testUiSchemaContext({
        useMock: true,
        ignoreMissingTranslations: true,
        organization: {
            name,
        },
    });

    const organizationElement = organization(uiSchemaContext);
    expect(organizationElement).toMatchObject({
        type: 'SINGLE_VALUE',
        label: testMessage('summary.organization'),
        display: name,
    });
});
