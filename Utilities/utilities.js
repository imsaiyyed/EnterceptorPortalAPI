const DomainAccounts = require('../Data/domainaccount').DomainAccountMaster;

module.exports.extractEmails = function (text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

module.exports.extractDomain = function (email) {
    return email.replace(/.*@/, "");
}

module.exports.extractAccountName = function (inputDomain) {
    for (domain of Object.keys(DomainAccounts)) {
        if (domain === inputDomain)
            return DomainAccounts[domain];
    }
    return undefined;
}

module.exports.extractAccountNameWithoutDomain = function (domain) {
    let accountName = domain.substr(0, domain.lastIndexOf("."));
    return accountName.charAt(0).toUpperCase() + accountName.slice(1);
}

module.exports.extractSentiment = function (score) {

    let neutralStart = -0.2;
    let positiveStart = 0.2;

    if (score > positiveStart)
        return 'Positive';
    else if (score >= neutralStart && score <= positiveStart)
        return 'Neutral';
    return 'Negative';
}
