const express = require('express');
const router = express.Router();
const { poolPromise } = require('../database/db')
const sentimentDistribution = require('../Utilities/sentiments');
const sentimentRange = require('../Data/sentimentrange');

router.get('/allemails', async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request().query("Select * from dbo.SentimentAnalysisMetadata");
    res.send(result.recordset);
})

router.get('/overall', async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request().query("Select domain as Client , avg(sentimentscore) as Score from dbo.SentimentAnalysisMetadata group by domain");
    res.send(sentimentDistribution(result.recordset));
})

router.get('/aggregate', async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .query("Select domain as name ,avg(sentimentscore) as score from dbo.SentimentAnalysisMetadata group by domain");
    res.send(result.recordset);
})

router.get('/orgs', async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request().query("Select domain as Client , avg(sentimentscore) as Score from dbo.SentimentAnalysisMetadata group by domain");
    res.send(result.recordset);
})

router.get('/all', async (req, res) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .query("Select * from dbo.SentimentAnalysisMetadata");
    res.send(result.recordset);
})

router.get('/positive', async (req, res) => {
    const pool = await poolPromise;
    const query = "Select domain as name ,avg(sentimentscore) as score from dbo.SentimentAnalysisMetadata group by domain having avg(sentimentscore) > @positiveLower"
    const result = await pool.request()
        .input('positiveLower', sentimentRange.positiveLower)
        .query(query);
    res.send(result.recordset);
})

router.get('/negative', async (req, res) => {
    const pool = await poolPromise;
    const query = "Select domain as name ,avg(sentimentscore) as score from dbo.SentimentAnalysisMetadata group by domain having avg(sentimentscore) < @neutralLower"
    const result = await pool.request()
        .input('neutralLower', sentimentRange.neutralLower)
        .query(query);
    res.send(result.recordset);
})


router.get('/neutral', async (req, res) => {
    const pool = await poolPromise;
    const query = "Select domain as name ,avg(sentimentscore) as score from dbo.SentimentAnalysisMetadata group by domain having avg(sentimentscore) between @neutralLower and @positiveLower"
    const result = await pool.request()
        .input('neutralLower', sentimentRange.neutralLower)
        .input('positiveLower', sentimentRange.positiveLower)
        .query(query);
    res.send(result.recordset);
})

router.get('/:organization', async (req, res) => {
    const pool = await poolPromise;
    const query = 'Select * from dbo.SentimentAnalysisMetadata where domain = @domain';
    const result = await pool.request()
        .input('domain', req.params.organization)
        .query(query);
    res.send(result.recordset);
})

module.exports = router;