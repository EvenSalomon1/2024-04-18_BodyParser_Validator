import fs from "fs";
import url from "url";
import path from "path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// * following two functions um zu lesen
export function readJSONFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, dataBuffer) => {
      if (err) return reject(err);
      const jsonString = dataBuffer.toString();
      const jsObj = JSON.parse(jsonString);
      resolve(jsObj);
    });
  });
}

// mit dieser Funktion alles auslesen, was in der entries.json drin steht
// mit dieser Funktion wird die Funktion drüber aufgerufen, könnte man auch in eine Funktion schreiben, aber so ist übersichtlicher
export function readEntries() {
  return readJSONFile(__dirname + "/data/entries.json");
}

// * following two functions um zu schreiben
export function writeJsonFile(path, jsObj) {
  return new Promise((resolve, reject) => {
    const jsonString = JSON.stringify(jsObj, null, 2);
    fs.writeFile(path, jsonString, (err) => {
      if (err) return reject(err);
      resolve(jsObj);
    });
  });
}

// mit dieser Funktion alles auslesen, was in der entries.json drin steht
// mit dieser Funktion wird die Funktion drüber aufgerufen, könnte man auch in eine Funktion schreiben, aber so ist übersichtlicher
export function writeEntries(entriesArray) {
  return writeJsonFile(__dirname + "/data/entries.json", entriesArray);
}
