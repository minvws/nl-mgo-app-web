import { faker } from '$test/faker';
import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { TableCol } from './TableCol';

vi.mock('@react-pdf/renderer');

test('renders children correctly', () => {
    const text = faker.lorem.sentence();
    const { container } = render(<TableCol>{text}</TableCol>);
    expect(container.textContent).toBe(text);
});

test('renders first col with dark variant', () => {
    const text = faker.lorem.sentence();
    const { container } = render(<TableCol variant="dark">{text}</TableCol>);
    expect(container.textContent).toBe(text);
});
