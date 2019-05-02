const _ = require('lodash');

module.exports = function sentimentDistribution(result) {
    let neutralStart = -0.2;
    let positiveStart = 0.2;

    let positiveCount = _.filter(result, o => o.Score > positiveStart).length;
    let neutralcount = _.filter(result, o => o.Score <= positiveStart && o.Score >= neutralStart).length;
    let negativeCount = _.filter(result, o => o.Score < neutralStart).length;

    return {
        Positive: positiveCount,
        Negative: negativeCount,
        Neutral: neutralcount
    }

}