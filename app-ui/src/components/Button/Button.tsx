export interface ButtonProps {
    label: string;
    variant?: 'solid' | 'light' | 'outline';
    disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, variant = 'solid', disabled = false }: ButtonProps) => {
    return (
        <button
            type="button"
            className={`block w-full py-4 px-6 text-base font-bold text-center rounded-lg border-2 outline-none ${getTypeColors(
                variant
            )} disabled:bg-[#CCCCCC] disabled:border-[#CCCCCC]`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

function getTypeColors(type: ButtonProps['variant']): string {
    switch (type) {
        case 'solid':
            return 'bg-[#007BC7] text-white border-[#007BC7] hover:bg-[#01689B] hover:border-[#01689B] focus:border-4 focus:border-[#B2D7EE]';
        case 'light':
            return 'bg-[#D9EBF7] text-[#01689B] border-[#D9EBF7] hover:bg-[#8FCAE7] hover:border-[#8FCAE7] focus:border-4 focus:border-[#EEF7FB]';
        case 'outline':
            return 'bg-white text-[#01689B] border-[#CCCCCC] hover:bg-[#007BC7] hover:border-[#007BC7] hover:text-white focus:border-4 focus:border-[#007BC7]';
        default:
            return '';
    }
}
