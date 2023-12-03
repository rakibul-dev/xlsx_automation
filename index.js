// const xlsx = require("xlsx");

// const workbook = xlsx.readFile("./bhupathi.xlsx"); // Step 2
// let workbook_sheet = workbook.SheetNames;
// let workbook_response = xlsx.utils.sheet_to_json(
//   // Step 4
//   workbook.Sheets[workbook_sheet[0]]
// );
// console.log({ workbook_response });

// const XLSX = require("xlsx");
// const workbook = XLSX.readFile("./bhupathi.xlsx");
// const sheet_name_list = workbook.SheetNames;
// const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
//   header: 1,
// });

// // xlData is an array of arrays, where each inner array represents a row

// // Assuming the first row contains headers (property names)
// const headers = xlData[0];

// // Create an array to store the result
// const result = [];

// // Iterate through rows starting from the second row
// for (let i = 1; i < xlData.length; i++) {
//   const row = xlData[i];
//   const rowData = {};

//   // Iterate through columns
//   for (let j = 0; j < headers.length; j++) {
//     const header = headers[j];
//     const value = row[j];
//     rowData[header] = value;
//   }

//   // Add the row data to the result array
//   result.push(rowData);
// }

// console.log(result);

// const XlsxPopulate = require("xlsx-populate");

// // Load an existing workbook
// XlsxPopulate.fromFileAsync("./bhupathi.xlsx").then((workbook) => {
//   // Modify the workbook.
//   //   const value = workbook
//   //     .sheet("Indian Companies Registered")
//   //     .cell("A2")
//   //     .value();
//   const values = workbook._sheets.;

//   // Log the value.
//   console.log(values);
// });

const xlsx = require("xlsx");
const workbook = xlsx.readFile("./bhupathi.xlsx"); //Here you should pass the file path
const sheetList = workbook.SheetNames; //Array of sheet names.
// console.log(sheetList);
let jsonPagesArray = [];
sheetList.forEach((sheet) => {
  // console.log({ sheet });
  const selectedSheet = workbook.Sheets[sheet];

  const range = xlsx.utils.decode_range(selectedSheet["!ref"]);

  // Get the number of rows
  const numberOfRows = range.e.r + 1;
  const importRange = `A2:J${numberOfRows}`;
  //   const headers = ["A", "B", "C"];
  //   var range = xlsx.utils.decode_range(sheetList["!fullref"]);
  //   console.log(range);

  //   console.log({ numberOfRows });

  const ws = workbook.Sheets["LLP Registered"];
  let data = xlsx.utils.sheet_to_json(ws, {
    range: importRange,
    blankrows: false,
    defval: "",
  });
  console.log(data);
});
// console.log(jsonPagesArray);

// const fs = require("fs");

// const filePath = "./bhupathi.xlsx";

// try {
//   // Check if the file exists
//   if (!fs.existsSync(filePath)) {
//     throw new Error("File not found");
//   }

//   // Read the Excel file
//   const workbook = XLSX.readFile(filePath);

//   // Assuming you are interested in the first sheet, you can access it like this
//   const firstSheet = workbook.Sheets[workbook.SheetNames[2]];

//   // Check if the sheet is undefined
//   if (!firstSheet) {
//     throw new Error("Sheet not found");
//   }

//   // Find the range of cells in the sheet
//   const range = XLSX.utils.decode_range(firstSheet["!ref"]);

//   // Get the number of rows
//   range.s.r = 2;
//   const numberOfRows = range.e.r + 2;

//   console.log(`Number of rows: ${numberOfRows}`);
// } catch (error) {
//   console.error(`Error: ${error.message}`);
// }
