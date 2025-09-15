import { faker } from '$test/faker';
import { HealthUiSchema } from '@minvws/mgo-hcim';
import { HealthUiGroup, SingleValue } from '@minvws/mgo-hcim-ui';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { HealthUiSchemaTable } from './HealthUiSchemaTable';

vi.mock('@react-pdf/renderer');

test('renders schema correctly', () => {
    const element = {
        type: 'SINGLE_VALUE',
        label: faker.lorem.sentence(),
        display: faker.lorem.sentence(),
    } satisfies SingleValue;
    const group: HealthUiGroup = {
        label: faker.lorem.sentence(),
        children: [element],
    };
    const schema: HealthUiSchema = {
        label: faker.lorem.sentence(),
        children: [group],
    };

    render(<HealthUiSchemaTable schema={schema} />);

    const heading = screen.getByTestId('schema-label');
    expect(heading).toHaveTextContent(schema.label);

    const groupLabel = screen.getByTestId('group-label');
    expect(groupLabel).toHaveTextContent(group.label!);

    const elementLabel = screen.getByTestId('element-label');
    const elementValue = screen.getByTestId('element-value');
    expect(elementLabel).toHaveTextContent(element.label);
    expect(elementValue).toHaveTextContent(element.display!);
});
