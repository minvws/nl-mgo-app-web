import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { InputField } from './InputField';
import { faker } from '@faker-js/faker';

test('render with error', async () => {
    const error = faker.lorem.paragraph(1);
    render(
        <InputField
            data-testid="test-input"
            error={error}
            name={faker.word.sample()}
            id={faker.word.sample()}
            label={faker.word.sample()}
        />
    );

    const element = await screen.findByRole('textbox');
    expect(element).toBeVisible();

    const errorMessage = await screen.findByText(error);
    expect(errorMessage).toBeVisible();
});
