const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IndianCompanyRegistered = Schema(
  {
    //   INDIAN COMPANIES REGISTERD
    CIN: { type: String },
    COMPANY_NAME: { type: String },
    DATE_OF_INCORPORATION: { type: String },
    STATE: { type: String },
    ROC: { type: String },
    CATEGORY: { type: String },
    SUB_CATEGORY: { type: String },
    CLASS: { type: String },
    AUTHORIZED_CAPITAL: { type: String },
    PAID_CAPITAL: { type: String },
    NUMBER_OF_MEMBERS: { type: String },
    ACTIVITY_DESCRIPTION: { type: String },
    REGISTERED_OFFICE_ADDRESS: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model(
  "IndianCompanyRegistered",
  IndianCompanyRegistered
);
