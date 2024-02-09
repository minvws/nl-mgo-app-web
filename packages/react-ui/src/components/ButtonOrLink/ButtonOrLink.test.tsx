import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { ButtonOrLink } from './ButtonOrLink';
import { faker } from '@faker-js/faker';

test('renders as a `button` when no href is given', async () => {
    render(<ButtonOrLink data-testid="test" />);

    const element = await screen.findByTestId('test');
    expect(element.tagName).toBe('BUTTON');
    expect(element).toHaveAttribute('type', 'button');
});

test('renders as an `a` when a href is given', async () => {
    const href = faker.internet.url();
    render(<ButtonOrLink data-testid="test" href={href} />);

    const element = await screen.findByTestId('test');
    expect(element.tagName).toBe('A');
    expect(element).toHaveAttribute('href', href);
});

test('drops href when rendered as disabled `a`', async () => {
    const href = faker.internet.url();
    render(<ButtonOrLink data-testid="test" href={href} isDisabled />);

    const element = await screen.findByTestId('test');
    expect(element).not.toHaveAttribute('href');
});

test('does not respond to clicks when rendered as disabled `button`', async () => {
    const onClick = vi.fn();
    const { rerender } = render(<ButtonOrLink onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();

    rerender(<ButtonOrLink onClick={onClick} isDisabled />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
});
