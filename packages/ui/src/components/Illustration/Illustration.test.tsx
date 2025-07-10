import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Illustration } from './Illustration';
import { illustrationNames, illustrations } from './illustrations';

test('renders illustration', async () => {
    render(
        <Illustration
            data-testid="test-illustration"
            illustration={faker.helpers.arrayElement(illustrationNames)}
        />
    );

    screen.getByTestId('test-illustration');
});

test('renders illustration in darkmode when forced', async () => {
    const illustration = faker.helpers.arrayElement(illustrationNames);
    render(
        <Illustration forceDarkMode data-testid="test-illustration" illustration={illustration} />
    );

    const image = screen.getByTestId('test-illustration').querySelector('img');
    expect(image?.getAttribute('src')).toBe(illustrations[illustration].dark);
});
