export const environmentConfig = {
    local: {
        baseUrl: 'http://localhost:8000',
    },
    test: {
        baseUrl: 'https://web.test.mgo.irealisatie.nl',
    },
};

export type Environment = keyof typeof environmentConfig;
