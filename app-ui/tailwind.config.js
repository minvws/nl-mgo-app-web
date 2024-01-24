module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'solid': '#007BC7',
                'disabled': '#CCCCCC'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
