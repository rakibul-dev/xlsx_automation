const xlsx = require("xlsx");
const mongoose = require("mongoose");
const Company = require("./models/company_model");
const queue = require("./queue/company_queue");
const downloadFile = require("./download_script");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@my-cluster.wlkgtiv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`app connected with ${process.env.DB_NAME} database 🚀`);
    // Call the function to download and automate data after successful database connection
    downloadAndAutomateData();
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

const automateData = () => {
  try {
    const workbook = xlsx.readFile("./Download30DaysExcel.xlsx");
    const sheetList = workbook.SheetNames;

    let jsonPagesArray = [];
    sheetList.forEach((sheet) => {
      const selectedSheet = workbook.Sheets[sheet];
      const range = xlsx.utils.decode_range(selectedSheet["!ref"]);
      const numberOfRows = range.e.r + 1;
      const importRange = `A2:J${numberOfRows}`;

      const ws = workbook.Sheets[sheet];
      let company_data = xlsx.utils.sheet_to_json(ws, {
        range: importRange,
        blankrows: false,
        defval: "",
      });

      company_data.forEach(async (item, index) => {
        // console.log({ item });

        queue.add(item, { removeOnComplete: true, removeOnFail: true });

        // const inserted_company = await new Company(item).save();
        // console.log(inserted_company);
      });
    });
  } catch (error) {
    console.error("Error automating data:", error);
  }
};

const downloadAndAutomateData = () => {
  downloadFile(process.env.FILE_DOWNLOAD_URL, automateData);
};
