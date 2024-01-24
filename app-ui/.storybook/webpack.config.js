module.exports = {
    module: {
        rules: [
            {
                test: /\.svg$/i,
                include: '../src/Assets',
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
};
