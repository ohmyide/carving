const fs = require("fs");
const path = require("path");
const arg = process.argv;
if(!arg[2]) {
    console.error('请输入文章标题');
    return;
}

// console.log(arg,new Date().toLocaleDateString());
const date = new Date().toLocaleDateString();
const initContent =
`---
title: ${arg[2]}
date: ${date}
tags: 
---

`;
fs.writeFile(path.resolve(path.resolve(process.cwd()),`./md/${date} ${arg[2]}.md`), initContent, (err) => {
    if (err) throw err;
    console.log(`${date} ${arg[2]}.md 创建成功`);
});