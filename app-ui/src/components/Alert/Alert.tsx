import { ReactElement } from 'react';
import Success from './Icons/success';
import Warning from './Icons/warning';
import Info from './Icons/info';

export interface AlertProps {
    label: string;
    status: 'success' | 'warning' | 'info';
    description?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Alert = ({ label, status, description }: AlertProps) => {
    return (
        <div
            role="alert"
            className={`flex w-full bg-white border-[#E3E3E3] border-2 p-3 gap-3 rounded-lg`}
        >
            <div className={`w-6 h-6`}>{getStatusIcon(status)}</div>
            <div className={`flex flex-col gap-1`}>
                <span className={`text-base font-bold text-black`}>{label}</span>
                {description ? (
                    <span className={`text-base italic font-normal text-[#535353]`}>
                        {description}
                    </span>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

function getStatusIcon(status: AlertProps['status']): ReactElement | null {
    switch (status) {
        case 'success':
            return <Success />;
        case 'warning':
            return <Warning />;
        case 'info':
            return <Info />;
        default:
            return null;
    }
}
