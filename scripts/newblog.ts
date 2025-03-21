const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  throw new Error('Usage: node ${__filename} "<title>"');
}

const title = process.argv[2];
const now = new Date();
let filename = process.argv[2]
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
  .replace(/[^\w\s-]/g, "") // Remove invalid characters
  .trim() // Trim whitespace
  .toLowerCase()
  .replace(/[-\s]+/g, "-"); // Replace spaces and hyphens with a single hyphen
filename += `-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}.mdx`;

const filePath = path.join(__dirname, `../src/app/blogs/[blogId]/${filename}`);
if (fs.existsSync(filePath)) {
  throw new Error(`File/Directory ${filePath} already exists`);
}

fs.writeFileSync(
  filePath,
  `
[//]: # "DO NOT CHANGE ANYTHING BELOW"
[//]: # "Generated by /scripts/newblog.js"

export const creation_time = "${now.toUTCString()}";
export const title = "${title}";
`,
);

console.log(`Created file ${filePath}`);
