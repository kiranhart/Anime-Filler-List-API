const path = require('path');
const express = require('express');
const { PROJECT_NAME, PROJECT_AUTHOR, PROEJCT_VERSION, API_VERSION } = require('../data/constants');
const router = express.Router();

router.get(`/v${API_VERSION}`, (req, res) => {
    res.json({
        name: PROJECT_NAME,
        author: PROJECT_AUTHOR,
        version: PROEJCT_VERSION,
        api_version: API_VERSION
    });
});

router.use('', require('./shows'));

module.exports = router;