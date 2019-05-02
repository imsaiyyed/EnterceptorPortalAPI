const _ = require("lodash");
const  {appConfig} = require('../constants/appConfig');
const axios = require('axios');
 
function getVerifiedData ()  {
  let emailList = [],
    emailIds = [];
    axios
      .get(`${appConfig.serverURL}/api/metadata/verifiedEmails`)
      .then(response => {
        if (response.data.length > 0) {
          emailList = _.map(
            response.data,
            _.partialRight(_.pick, ["Subject", "Verified"])
          );
          emailIds = _.map(response.data, _.partialRight(_.pick, ["Id"]));
          exportToTsv(emailList, emailIds);
        }
      }) .catch(error => {
        return error;
      });
  
};

function exportToTsv  (emailList, emailIds) {
  let emailData = emailList;
  let emailDataIds = emailIds;
    axios
      .post(
        `${appConfig.serverURL}/api/metadata/emaildata/azurestorage`,
        emailData
      )
      .then(response => {
        bulkUploadEmailData(emailDataIds);
      })
      .catch(error => {
        return error;
      });
};

function bulkUploadEmailData (emailIds) {
  let emailDataIds = emailIds;
    axios
      .post(
        `${appConfig.serverURL}/api/metadata/emaildata/bulkUpdate`,
        emailDataIds
      )
      .then(response => {
        runTsvEngine();
      })
     .catch(error => {
        return error;
      });
};

function runTsvEngine (){
    axios
      .post(`${appConfig.serverURL}/api/metadata/tsvRunEngine`)
      .then(error => {
        // console.log("error", error);
      });
};

exports.getVerifiedData = getVerifiedData;