import { faker } from '$test/faker';
import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { MultilineText } from './MultilineText';

vi.mock('@react-pdf/renderer');

test('renders single line text', () => {
    const text = faker.lorem.sentence();
    const { container } = render(<MultilineText>{text}</MultilineText>);
    expect(container.textContent).toBe(text);
});

test('renders multiline text with \\n separator', () => {
    const line1 = faker.lorem.sentence();
    const line2 = faker.lorem.sentence();
    const text = `${line1}\\n${line2}`;

    const { container } = render(<MultilineText>{text}</MultilineText>);

    expect(container.textContent).toBe(`${line1}${line2}`);
    expect(container.querySelectorAll('p')).toHaveLength(2);
});

test('returns null when children is empty', () => {
    const { container } = render(<MultilineText>{''}</MultilineText>);
    expect(container.firstChild).toBeNull();
});
