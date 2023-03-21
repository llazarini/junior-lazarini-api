module.exports = {
    apps : [
        {
            name: 'EVR Drive',
            script: './build/server.js',            env: {
                APP_PORT: 3000,
            }
        },
    ],
};
