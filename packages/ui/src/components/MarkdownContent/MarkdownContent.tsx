import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import './markdown.css';

export type MarkdownContentProps = HTMLAttributes<HTMLElement>;

export const MarkdownContent = ({ children, className, ...rest }: MarkdownContentProps) => {
    return (
        <div className={cn('mgo-markdown-content', className)} {...rest}>
            {children}
        </div>
    );
};
