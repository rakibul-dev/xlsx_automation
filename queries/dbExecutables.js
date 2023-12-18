const IndianCompanyRegistered = require("../models/IndianCompanyRegistered");
const ForeignCompanyRegistered = require("../models/ForeignCompanyRegistered");
const LlpRegisteredCompany = require("../models/LlpRegisteredCompany");
const ForeignLlpRegisteredCompany = require("../models/ForeignLlpRegisteredCompany");

function replaceSpacesWithUnderscores(obj) {
  const newObj = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/ /g, "_");
      newObj[newKey] = obj[key];
    }
  }

  return newObj;
}

const insertDataToDb = async (data) => {
  try {
    if (data.data.sheet == "Indian Companies Registered") {
      const { CIN } = data.data.item;

      const item = replaceSpacesWithUnderscores(data.data.item);
      const foundICR = await IndianCompanyRegistered.findOne({
        CIN,
      }).exec();
      if (foundICR) {
        const isFoundICR = await IndianCompanyRegistered.findOneAndUpdate({
          CIN,
          item,
        }).exec();
        console.log({ CIN, isFoundICR });
      } else {
        const createICR = await new IndianCompanyRegistered(item).save();
        console.log({ createICR });
      }
    } else if (data.data.sheet == "Foreign Companies Registered") {
      const { FCRN } = data.data.item;
      const item = replaceSpacesWithUnderscores(data.data.item);
      const foundFCR = await ForeignCompanyRegistered.findOne({
        FCRN,
      }).exec();
      if (foundFCR) {
        const isFoundFCR = await ForeignCompanyRegistered.findOneAndUpdate({
          FCRN,
          item,
        }).exec();
        console.log({ FCRN, isFoundFCR });
      } else {
        const createFCR = await new ForeignCompanyRegistered(item).save();
        console.log({ createFCR });
      }
    } else if (data.data.sheet == "LLP Registered") {
      const { LLPIN } = data.data.item;
      const item = replaceSpacesWithUnderscores(data.data.item);
      const foundFLRC = await ForeignLlpRegisteredCompany.findOne({
        LLPIN,
      }).exec();
      if (foundFLRC) {
        const isFoundFLRC = await ForeignLlpRegisteredCompany.findOneAndUpdate({
          LLPIN,
          item,
        }).exec();
        console.log({ LLPIN, isFoundFLRC });
      } else {
        const createFLRC = await new ForeignLlpRegisteredCompany(item).save();
        console.log({ createFLRC });
      }
    } else {
      console.log("Foreign LLP Registered");
      const { FLLPIN } = data.data.item;
      const item = replaceSpacesWithUnderscores(data.data.item);
      const foundLRC = await LlpRegisteredCompany.findOne({
        FLLPIN,
      }).exec();
      if (foundLRC) {
        const isFoundLRC = await LlpRegisteredCompany.findOneAndUpdate({
          FLLPIN,
          item,
        }).exec();
        console.log({ FLLPIN, isFoundLRC });
      } else {
        const createLRC = await new LlpRegisteredCompany(item).save();
        console.log({ createLRC });
      }
    }
  } catch (error) {
    console.log({ error });
  }
};

module.exports = insertDataToDb;
