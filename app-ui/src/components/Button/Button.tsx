type Variant = 'solid' | 'light' | 'outline';

export interface ButtonProps {
    label: string;
    variant?: Variant;
    disabled?: boolean;
}

const typeColors: Record<Variant, string> = {
    solid: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-800 hover:border-blue-800 focus:border-4 focus:border-blue-400',
    light: 'bg-blue-200 text-blue-800 border-blue-200 hover:bg-blue-300 hover:border-blue-300 focus:border-4 focus:border-blue-50',
    outline:
        'bg-white text-blue-800 border-grey-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white focus:border-4 focus:border-blue-500',
};

export const Button = ({ label, variant = 'solid', disabled = false }: ButtonProps) => {
    return (
        <button
            type="button"
            className={`bg-primary-600 block w-full rounded-lg border-2 px-6 py-4 text-center text-base font-bold outline-none ${typeColors[variant]} disabled:bg-grey-300 disabled:border-grey-300`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};
