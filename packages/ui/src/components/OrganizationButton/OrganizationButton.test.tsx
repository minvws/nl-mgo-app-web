import { faker } from '@faker-js/faker';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { OrganizationButton, type OrganizationButtonProps } from './OrganizationButton';

test('renders ButtonCard', async () => {
    const props: OrganizationButtonProps = {
        title: faker.word.sample(),
        subTitle: faker.word.sample(),
    };

    render(<OrganizationButton {...props} />);

    const element = await screen.findByRole('button');
    expect(element).toBeVisible();
});

test('is aria-disabled and ignores clicks when disabled', async () => {
    const onClick = vi.fn();
    const props: OrganizationButtonProps = {
        title: faker.word.sample(),
        disabled: true,
        onClick,
    };

    render(<OrganizationButton {...props} />);

    const element = await screen.findByRole('button');
    expect(element).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(element);
    expect(onClick).not.toHaveBeenCalled();
});
