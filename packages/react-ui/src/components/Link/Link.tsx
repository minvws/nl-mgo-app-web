import { twMerge } from 'tailwind-merge';
import { ButtonOrLink, ButtonOrLinkProps } from '../ButtonOrLink/ButtonOrLink';

export type LinkProps = ButtonOrLinkProps;

export const Link = ({ children, className, ...rest }: LinkProps) => {
    return (
        <ButtonOrLink
            className={twMerge(
                `cursor-pointer text-blue-700 underline visited:text-blue-900 hover:no-underline`,
                className
            )}
            {...rest}
        >
            {children}
        </ButtonOrLink>
    );
};
