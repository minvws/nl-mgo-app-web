import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { DynamicElement } from './DynamicElement';

test('renders as div by default', async () => {
    render(<DynamicElement data-testid="test" />);

    const element = await screen.findByTestId('test');
    expect(element.tagName).toBe('DIV');
});

test('can render as another html tag', async () => {
    const tag = faker.helpers.arrayElement([
        'section',
        'article',
        'span',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
    ]) as keyof HTMLElementTagNameMap;
    render(<DynamicElement data-testid="test" as={tag} />);

    const element = await screen.findByTestId('test');
    expect(element.tagName).toBe(tag.toUpperCase());
});

test('can render as another Component', async () => {
    const content = faker.lorem.sentence();
    const AnotherComponent = (props: React.HTMLAttributes<HTMLElement>) => (
        <article {...props}>{content}</article>
    );

    render(<DynamicElement data-testid="test" as={AnotherComponent} />);

    const element = await screen.findByTestId('test');
    expect(element.tagName).toBe('ARTICLE');
    expect(element).toHaveTextContent(content);
});
