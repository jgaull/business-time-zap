'use strict';

const authentication = {
    type: 'basic',
    test: {
        url: process.env.API_BASE_URL
    },
    connectionLabel: '{{bundle.authData.username}}'
};

module.exports = authentication;