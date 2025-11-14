import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { DescriptionNotice, type DescriptionNoticeProps } from './DescriptionNotice';
import { variants } from './variants';

test('renders with content', async () => {
    const props: DescriptionNoticeProps = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
    };

    render(<DescriptionNotice data-testid="test" {...props} />);

    expect(screen.getByTestId('test')).toHaveTextContent(props.children as string);
});
