/**
 * Created by swapnil on 09/02/18.
 */
'use strict';

let checkMandatoryRequestBody = (requestBody, mandatoryFields) => {
    let reqBodyKeys = Object.keys(requestBody);
    if (!requestBody || reqBodyKeys.length === 0) {
        return {message: 'Request can\'t be empty'};
    }
    let msg;
    for (let i=0;i<mandatoryFields.length;i++){
        if(reqBodyKeys.indexOf(mandatoryFields[i])<0){
            msg = mandatoryFields[i] + ' key is missing';
            break;
        }
    }
    if(msg) {
        return {message: msg};
    }
    return {message: 'success'};
};

const utils = {
    checkMandatoryRequestBody: checkMandatoryRequestBody
};

module.exports = utils;
