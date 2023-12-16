// // // const xlsx = require("xlsx");
// // // var cron = require("node-cron");
// // // const mongoose = require("mongoose");
// // // const Company = require("./models/company_model");

// // // const downloadFile = require("./download_script");

// // // mongoose
// // //   .connect(
// // //     `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@my-cluster.wlkgtiv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
// // //   )
// // //   .then(() => {
// // //     console.log(`app connected with ${process.env.DB_NAME} database 🚀`);
// // //   })
// // //   .catch((err) => {
// // //     console.error("MongoDB connection error: ", err);
// // //   });

// // // const automateData = async () => {
// // //   const workbook = xlsx.readFile("./Download30DaysExcel.xlsx");
// // //   const sheetList = workbook.SheetNames; //Array of sheet names.
// // //   // console.log(sheetList);
// // //   let jsonPagesArray = [];
// // //   sheetList.forEach(async (sheet) => {
// // //     // console.log({ sheet });
// // //     const selectedSheet = workbook.Sheets[sheet];

// // //     const range = xlsx.utils.decode_range(selectedSheet["!ref"]);

// // //     // Get the number of rows
// // //     const numberOfRows = range.e.r + 1;
// // //     const importRange = `A2:J${numberOfRows}`;
// // //     //   const headers = ["A", "B", "C"];
// // //     //   var range = xlsx.utils.decode_range(sheetList["!fullref"]);
// // //     //   console.log(range);

// // //     //   console.log({ numberOfRows });

// // //     const ws = workbook.Sheets[sheet];
// // //     let data = xlsx.utils.sheet_to_json(ws, {
// // //       range: importRange,
// // //       blankrows: false,
// // //       defval: "",
// // //     });
// // //     //   console.log(data);

// // //     data.forEach(async (item, index) => {
// // //       console.log({ item });
// // //       //   const inserted_company = await new Company(item).save();
// // //       //   console.log(inserted_company);
// // //     });

// // //     //   const company = await new Company({ data });
// // //   });
// // // };
// // // downloadFile(process.env.FILE_DOWNLOAD_URL);

// // // // cron.schedule("3 0 * * *", () => {
// // // //   console.log("running a task every minute");
// // // // });

// // const xlsx = require("xlsx");
// // var cron = require("node-cron");
// // const mongoose = require("mongoose");
// // const Company = require("./models/company_model");

// // const downloadFile = require("./download_script");

// // mongoose
// //   .connect(
// //     `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@my-cluster.wlkgtiv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
// //   )
// //   .then(() => {
// //     console.log(`app connected with ${process.env.DB_NAME} database 🚀`);
// //     // Call the function to automate data after successful database connection
// //     automateData();
// //   })
// //   .catch((err) => {
// //     console.error("MongoDB connection error: ", err);
// //   });

// // const automateData = async () => {
// //   try {
// //     // Download the file first
// //     await downloadFile(process.env.FILE_DOWNLOAD_URL);

// //     // Now, read the downloaded file
// //     const workbook = xlsx.readFile("./Download30DaysExcel.xlsx");
// //     const sheetList = workbook.SheetNames;

// //     let jsonPagesArray = [];
// //     sheetList.forEach(async (sheet) => {
// //       const selectedSheet = workbook.Sheets[sheet];
// //       const range = xlsx.utils.decode_range(selectedSheet["!ref"]);
// //       const numberOfRows = range.e.r + 1;
// //       const importRange = `A2:J${numberOfRows}`;

// //       const ws = workbook.Sheets[sheet];
// //       let data = xlsx.utils.sheet_to_json(ws, {
// //         range: importRange,
// //         blankrows: false,
// //         defval: "",
// //       });

// //       data.forEach(async (item, index) => {
// //         console.log({ item });
// //         // Uncomment the following lines when you want to save data to MongoDB
// //         // const inserted_company = await new Company(item).save();
// //         // console.log(inserted_company);
// //       });
// //     });
// //   } catch (error) {
// //     console.error("Error automating data:", error);
// //   }
// // };

// // // Uncomment the following line when you want to schedule the task using cron
// // // cron.schedule("3 0 * * *", automateData);

// const xlsx = require("xlsx");
// const cron = require("node-cron");
// const mongoose = require("mongoose");
// const Company = require("./models/company_model");

// const downloadFile = require("./download_script");

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@my-cluster.wlkgtiv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
//   )
//   .then(async () => {
//     console.log(`app connected with ${process.env.DB_NAME} database 🚀`);

//     // Download the file first
//     await downloadFile(process.env.FILE_DOWNLOAD_URL);

//     // Now, read the downloaded file
//     automateData();
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error: ", err);
//   });

// const automateData = async () => {
//   try {
//     const workbook = xlsx.readFile("./Download30DaysExcel.xlsx");
//     const sheetList = workbook.SheetNames;

//     let jsonPagesArray = [];
//     sheetList.forEach(async (sheet) => {
//       const selectedSheet = workbook.Sheets[sheet];
//       const range = xlsx.utils.decode_range(selectedSheet["!ref"]);
//       const numberOfRows = range.e.r + 1;
//       const importRange = `A2:J${numberOfRows}`;

//       const ws = workbook.Sheets[sheet];
//       let data = xlsx.utils.sheet_to_json(ws, {
//         range: importRange,
//         blankrows: false,
//         defval: "",
//       });

//       data.forEach(async (item, index) => {
//         console.log({ item });
//         // Uncomment the following lines when you want to save data to MongoDB
//         // const inserted_company = await new Company(item).save();
//         // console.log(inserted_company);
//       });
//     });
//   } catch (error) {
//     console.error("Error automating data:", error);
//   }
// };

// // Uncomment the following line when you want to schedule the task using cron

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
    // downloadAndAutomateData();
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

cron.schedule("3 0 * * *", () => {
  downloadAndAutomateData();
});
