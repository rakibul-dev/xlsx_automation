const https = require("https");
const fs = require("fs");
const path = require("path");
const folderPath = "./";

function deleteExcelFiles(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      if (path.extname(filePath).toLowerCase() === ".xlsx") {
        deleteFile(filePath);
      }
    });
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log(`Deleted file: ${path.basename(filePath)}`);
    }
  });
}

async function downloadFile(url, cb) {
  const filename = path.basename(url);
  const extension = path.extname(filename);
  //   deleteExcelFiles(folderPath);

  const correctedFilename = extension ? filename : filename + ".xlsx";
  const fileStream = fs.createWriteStream(correctedFilename);

  const options = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      Referer: "https://www.mca.gov.in",
    },
  };

  const req = https.get(url, options, (res) => {
    if (res.statusCode === 200) {
      res.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
        console.log("Download finished");
        cb();
      });
    } else {
      console.error(`Error: Received status code ${res.statusCode}`);
    }
  });

  req.on("error", (err) => {
    console.error(`Error: ${err.message}`);
  });

  req.end();
}

module.exports = downloadFile;
