import { Container } from '@minvws/mgo-react-ui';
import { type HTMLAttributes } from 'react';

export interface FooterProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {}

export function Footer(props: FooterProps) {
    return (
        <div className="bg-blue-700 text-white" {...props}>
            <Container>
                <div className="py-12">Footer</div>
            </Container>
        </div>
    );
}
