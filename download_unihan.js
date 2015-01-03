var fs=require("fs");
var request=require("request");
var zlib=require("zlib");
var unzip=require("unzip");

console.log("downloading unihan");
var targetpath=__dirname + "/unihan-raw/";
if (!fs.existsSync(targetpath)) fs.mkdirSync(targetpath);
request("http://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip")
  .pipe(unzip.Extract({ path: targetpath }));