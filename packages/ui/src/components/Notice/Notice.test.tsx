import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Notice, type NoticeProps } from './Notice';
import { variants } from './variants';

test('renders with content', async () => {
    const props: NoticeProps = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
    };

    render(<Notice data-testid="test" {...props} />);

    expect(screen.getByTestId('test')).toHaveTextContent(props.children as string);
});
