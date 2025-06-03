import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import { iconNames } from '../Icon/icons';
import { DescriptionButton, type DescriptionButtonProps } from './DescriptionButton';
import { type Variant, variants } from './variants';

test.each<Variant[]>(variants.map((x) => [x]))(
    'renders a button with a label as variant %s',
    async (variant) => {
        const props: DescriptionButtonProps = {
            term: faker.lorem.sentence(),
            details: faker.lorem.sentence(),
            variant,
            icon: faker.helpers.arrayElement(iconNames),
        };

        render(<DescriptionButton {...props} />);

        expect(screen.getByRole('button')).toHaveTextContent(props.term as string);
        expect(screen.getByRole('button')).toHaveTextContent(props.details as string);
    }
);

test.each<Variant[]>(variants.map((x) => [x]))(
    'renders a loading button as variant %s',
    async (variant) => {
        const props: DescriptionButtonProps = {
            term: faker.lorem.sentence(),
            details: faker.lorem.sentence(),
            icon: faker.helpers.arrayElement(iconNames),
            loadingText: faker.lorem.sentence(),
            isLoading: true,
            variant,
        };

        render(<DescriptionButton {...props} />);

        const element = screen.getByRole('button');
        const spinner = within(element).getByTestId('spinner');

        expect(element).toHaveTextContent(props.loadingText as string);
        expect(spinner).toBeVisible();
    }
);
