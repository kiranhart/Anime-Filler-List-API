const express = require('express');
const { API_VERSION, EP_TYPE_DICT } = require('../data/constants');
const fetchShowInfo = require('../scraper/fetchShowInfo');
const fetchShowList = require('../scraper/fetchShowList');
const router = express.Router();

router.get(`/v${API_VERSION}/shows`, async(req, res) => {
    res.json({
        data: await fetchShowList()
    });
});

router.get(`/v${API_VERSION}/shows/:group`, async(req, res) => {
    const showList = await fetchShowList();
    const group = req.params.group.toUpperCase() || 'A';

    res.json({
        data: showList.filter((e) => e.group === group)
    });
});

router.get(`/v${API_VERSION}/show/:show`, async(req, res) => {
    const showInfo = await fetchShowInfo(req.params.show);

    res.json({
        data: showInfo
    });
});

router.get(`/v${API_VERSION}/show/:show/:type`, async(req, res) => {
    const showInfo = await fetchShowInfo(req.params.show);
    const type = req.params.type.toLowerCase();
    if (type.includes('canon') || type.includes('filler') || type.includes('mixed')) {
        res.json({
            data: showInfo.episodes.filter((e) => e.type == EP_TYPE_DICT[type])
        });
        return;
    }

    res.json({
        msg: 'Please provide a valid episode type',
        validTypes: Object.keys(EP_TYPE_DICT)
    });
});

module.exports = router;