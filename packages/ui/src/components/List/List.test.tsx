import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import { List } from '.';

test('renders a default List', async () => {
    const props = {
        children: [
            <List.Item key="1">
                <List.Icon icon="encrypted" />
                {faker.lorem.sentences(3)}
            </List.Item>,
            <List.Item key="2">{faker.lorem.sentences(3)}</List.Item>,
        ],
    };

    render(<List data-testid="test" {...props} />);

    const element = await screen.findByTestId('test');
    expect(element).toBeVisible();
    expect(element.tagName).toBe('UL');

    const { getAllByRole } = within(element);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(props.children.length);
});
