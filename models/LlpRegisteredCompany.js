const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LlpRegisteredCompany = Schema(
  {
    // LlpRegisteredCompany
    LLPIN: { type: String },
    LIMITED_LIABILITY_PARTNERSHIP_NAME: { type: String },
    DATE_OF_INCORPORATION: { type: String },
    STATE: { type: String },
    ROC: { type: String },
    NUMBER_OF_PARTNERS: { type: String },
    NUMBER_OF_DESIGNATED_PARTNERS: { type: String },
    TOTAL_OBLIGATION_OF_CONTRIBUTION: { type: String },
    ACTIVITY_DESCRIPTION: { type: String },
    ACTIVITY_DESCRIPTION: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("LlpRegisteredCompany", LlpRegisteredCompany);
