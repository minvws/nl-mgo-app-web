import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { iconNames } from '../Icon/icons';
import { DetailList } from './DetailList';
import { type DetailListButtonProps } from './DetailListButton';
import { gaps } from './gap';

test.each(gaps)('renders detailList with gap `%s` with attributes', async (gap) => {
    render(<DetailList data-testid="test-list" gap={gap} />);
    expect(await screen.findByTestId('test-list')).toBeVisible();
});

test('render with child', async () => {
    const props: DetailListButtonProps = {
        title: faker.word.sample(),
        description: faker.word.sample(),
        date: faker.date.recent().toISOString(),
        icon: faker.helpers.arrayElement(iconNames),
    };
    render(
        <DetailList>
            <DetailList.Button {...props} />
        </DetailList>
    );
});
