import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';
import { test } from 'vitest';
import { DescriptionItem, type DescriptionItemProps } from './DescriptionItem';

test('render item', () => {
    const props: DescriptionItemProps = {
        term: faker.word.sample(),
        details: faker.word.sample(),
    };
    render(<DescriptionItem {...props} />);
});

test('render item with undefined term', () => {
    const props: DescriptionItemProps = {
        term: undefined,
        details: faker.word.sample(),
    };
    render(<DescriptionItem {...props} />);
});

test('render item with undefined details', () => {
    const props: DescriptionItemProps = {
        term: faker.word.sample(),
        details: undefined,
    };
    render(<DescriptionItem {...props} />);
});
