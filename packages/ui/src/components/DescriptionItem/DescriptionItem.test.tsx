import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { DescriptionItem, type DescriptionItemProps } from './DescriptionItem';

test('render item', () => {
    const props = {
        term: faker.word.sample(),
        details: faker.word.sample(),
    } satisfies DescriptionItemProps;

    render(<DescriptionItem {...props} />);
    const definition = screen.getByRole('definition', { name: props.term });
    expect(definition).toHaveTextContent(props.details);
});

test('render item with undefined term', () => {
    const props = {
        term: undefined,
        details: faker.word.sample(),
    } satisfies DescriptionItemProps;

    render(<DescriptionItem {...props} />);
    const element = screen.getByText(props.details);
    expect(element).toBeVisible();
});

test('render item with undefined details', () => {
    const props = {
        term: faker.word.sample(),
        details: undefined,
    } satisfies DescriptionItemProps;
    render(<DescriptionItem {...props} />);
    const definition = screen.getByRole('definition', { name: props.term });
    expect(definition).toHaveTextContent('');
});
