import { icons } from './Icons';

export interface AlertProps {
    label: string;
    status: 'success' | 'warning' | 'info';
    description?: string;
}

export const Alert = ({ label, status, description }: AlertProps) => {
    return (
        <div
            role="alert"
            className={`flex w-full gap-3 rounded-lg border-2 border-[#E3E3E3] bg-white p-3`}
        >
            <div className={`h-6 w-6`}>{icons[status]}</div>
            <div className={`flex flex-col gap-1`}>
                <span className={`text-base font-bold text-black`}>{label}</span>
                {description ? (
                    <span className={`text-base font-normal italic text-[#535353]`}>
                        {description}
                    </span>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};
