const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ForeignCompanyRegistered = Schema(
  {
    // Foreign Companies Registered
    FCRN: { type: String },
    COMPANY_NAME: { type: String },
    DATE_OF_REGISTRATION: { type: String },
    COUNTRY_OF_INCORPORATION: { type: String },
    STATE: { type: String },
    ROC: { type: String },
    TYPE_OF_OFFICE: { type: String },
    ACTIVITY_DESCRIPTION: { type: String },
    FOREIGN_OFFICE_ADDRESS: { type: String },
    FOREIGN_COMPANY_PRESENT_ADDRESS_IN_INDIA: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model(
  "ForeignCompanyRegistered",
  ForeignCompanyRegistered
);
