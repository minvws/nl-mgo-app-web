import { useNavigate, type RouterLinkProps } from '$/routing';
import { Trans } from '@lingui/macro';
import { Button, cn, type ButtonProps } from '@minvws/mgo-mgo-ui';
import { RouterLink } from '../../routing/RouterLink';

export type BackButtonProps = ButtonProps & {
    to?: RouterLinkProps['to'];
    relative?: RouterLinkProps['relative'];
};

export function BackButton({ to, relative, className, ...rest }: BackButtonProps) {
    const navigate = useNavigate();

    const buttonProps: ButtonProps = {
        variant: 'ghost',
        leftIcon: 'chevron-left',
        className: 'my-3 pl-0',
        ...rest,
    };

    if (to) {
        return (
            <Button asChild className={cn(buttonProps.className, className)} {...buttonProps}>
                <RouterLink to={to} relative={relative}>
                    <Trans id="common.previous">Vorige</Trans>
                </RouterLink>
            </Button>
        );
    }

    return (
        <Button
            onClick={() => navigate(-1)}
            {...buttonProps}
            className={cn(buttonProps.className, className, { hidden: window.history.length <= 1 })}
        >
            <Trans id="common.previous">Vorige</Trans>
        </Button>
    );
}
