import { faker } from '$test/faker';
import { setupWithAppProviders } from '$test/helpers';
import { SingleValue, type HealthUiGroup as HealthUiGroupData } from '@minvws/mgo-hcim-ui';
import { screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HealthUiGroup } from './HealthUiGroup';

vi.mock('@react-pdf/renderer');

test('renders a HealthUiGroup', () => {
    const element = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.sentence(),
        value: { display: faker.lorem.sentence() },
    } satisfies SingleValue;
    const group: HealthUiGroupData = {
        label: faker.lorem.sentence(),
        children: [element],
    };

    setupWithAppProviders(<HealthUiGroup group={group} />);

    const groupLabel = screen.getByTestId('group-label');
    expect(groupLabel).toHaveTextContent(group.label!);

    const elementLabel = screen.getByTestId('element-label');
    expect(elementLabel).toHaveTextContent(element.label);

    const elementDisplay = screen.getByTestId('element-value');
    expect(elementDisplay).toHaveTextContent(element.value.display);
});

test('skips the label if not present in a HealthUiGroup', () => {
    const group: HealthUiGroupData = {
        label: undefined,
        children: [],
    };

    setupWithAppProviders(<HealthUiGroup group={group} />);

    const groupLabel = screen.queryByTestId('group-label');
    expect(groupLabel).toBeNull();
});
