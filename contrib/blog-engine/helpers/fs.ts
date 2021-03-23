import fs from "fs";

export function getFileContent(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(String(data));
      }
    });
  });
}
