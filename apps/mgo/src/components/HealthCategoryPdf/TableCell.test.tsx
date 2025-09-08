import { faker } from '$test/faker';
import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { TableCell } from './TableCell';

vi.mock('@react-pdf/renderer');

test('renders children correctly', () => {
    const text = faker.lorem.sentence();
    const { container } = render(<TableCell>{text}</TableCell>);
    expect(container.textContent).toBe(text);
});
