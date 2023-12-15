const https = require("https");
const fs = require("fs");
const path = require("path");

function downloadFile(url) {
  const filename = path.basename(url);
  const extension = path.extname(filename);

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
