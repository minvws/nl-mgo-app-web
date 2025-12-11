import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { faker } from '@faker-js/faker';
import { ClosableCard } from './ClosableCard';

const mockClosableCardProps = () => ({
    title: faker.lorem.word(),
    children: faker.lorem.sentence(),
    isOpen: true,
    onClose: vi.fn(),
});

test('ClosableCard renders null when isOpen is false', () => {
    const props = { ...mockClosableCardProps(), isOpen: false };

    render(<ClosableCard {...props} />);

    const cardElement = screen.queryByRole('article');
    expect(cardElement).toBeNull();
});

test('ClosableCard renders with title and details when isOpen is true', () => {
    const props = mockClosableCardProps();

    render(<ClosableCard {...props} />);

    const titleText = screen.getByText(new RegExp(props.title));
    expect(titleText).toBeInTheDocument();

    const detailsText = screen.getByText(props.children);
    expect(detailsText).toBeInTheDocument();
});

test('ClosableCard calls close when close button is clicked', async () => {
    const user = userEvent.setup();
    const props = mockClosableCardProps();

    render(<ClosableCard {...props} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    expect(props.onClose).toHaveBeenCalledTimes(1);
});

test('ClosableCard renders close button with correct icon', () => {
    const props = mockClosableCardProps();

    render(<ClosableCard {...props} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
});
