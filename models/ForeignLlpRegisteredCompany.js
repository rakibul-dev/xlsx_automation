const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ForeignLlpRegisteredCompany = Schema(
  {
    // ForeignLlpRegisteredCompany
    FLLPIN: { type: String },
    FOREIGN_LIMITED_LIABILITY_PARTNERSHIP: { type: String },
    DATE_OF_REGISTRATION: { type: String },
    COUNTRY_OF_INCORPORATION: { type: String },
    STATE_OF_PRINCIPAL_PLACE_OF_BUSINESS_IN_INDIA: { type: String },
    ROC: { type: String },
    TYPE_OF_OFFICE: { type: String },
    ACTIVITY_DESCRIPTION: { type: String },
    FOREIGN_OFFICE_ADDRESS: { type: String },
    FOREIGN_COMPANY_PRESENT_ADDRESS_IN_INDIA: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model(
  "ForeignLlpRegisteredCompany",
  ForeignLlpRegisteredCompany
);
