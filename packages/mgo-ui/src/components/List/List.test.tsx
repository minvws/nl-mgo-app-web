import { expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { List, ListItem, ListIcon } from '.';
import { faker } from '@faker-js/faker';

test('renders a default List', async () => {
    const props = {
        children: [
            <ListItem key="1">
                <ListIcon icon="encrypted" />
                {faker.lorem.sentences(3)}
            </ListItem>,
            <ListItem key="2">{faker.lorem.sentences(3)}</ListItem>,
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
