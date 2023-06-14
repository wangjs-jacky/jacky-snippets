const fse = require('fs-extra');
const path = require('path');
const {
  globSync,
} = require("glob");

// 定义要读取的 JSON 文件列表
const folderPath = path.join(__dirname, '../snippets');

// 使用 glob 函数获取文件列表
const snippetsFiles = globSync(`${folderPath}/**/*.code-snippets`, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
});

/* 合并后的 JSON 对象 */
const mergedJson = snippetsFiles.reduce((pre, filePath) => {
  const fileData = fse.readJSONSync(filePath, 'utf-8');
  pre = { ...fileData, ...pre }
  return pre;
}, {});


/* 输出 json 文件 */
const outputFilePath = path.join(__dirname, '../dist/fse.code-snippets');

fse.writeJSONSync(outputFilePath, mergedJson, {
  spaces: 2
});

console.log('JSON 文件合并完毕！');